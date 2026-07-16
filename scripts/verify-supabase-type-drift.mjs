import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const [, , expectedPath, actualPath] = process.argv;

if (!expectedPath || !actualPath) {
  console.error(
    "Usage: node scripts/verify-supabase-type-drift.mjs <expected> <actual>",
  );
  process.exit(2);
}

const propertyName = "__InternalSupabase";

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const findMatchingBrace = (source, openIndex) => {
  let depth = 0;
  let quote = null;
  let lineComment = false;
  let blockComment = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    const previous = source[index - 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (char === quote && previous !== "\\") {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
      if (depth < 0) {
        break;
      }
    }
  }

  throw new Error("Could not find matching brace.");
};

const removeLeadingComments = (source, startIndex, floorIndex) => {
  let cursor = startIndex;

  while (cursor > floorIndex) {
    let lineStart = source.lastIndexOf("\n", cursor - 2) + 1;
    if (lineStart < floorIndex) {
      lineStart = floorIndex;
    }

    const line = source.slice(lineStart, cursor).trim();
    if (line.startsWith("//") || line === "") {
      cursor = lineStart;
      continue;
    }

    break;
  }

  return cursor;
};

const normalizeGeneratedTypes = (source, label) => {
  const databaseStart = source.indexOf("export type Database = {");
  if (databaseStart === -1) {
    throw new Error(`${label}: missing "export type Database" declaration.`);
  }

  const databaseOpen = source.indexOf("{", databaseStart);
  const databaseClose = findMatchingBrace(source, databaseOpen);
  const databaseBody = source.slice(databaseOpen + 1, databaseClose);
  const allOccurrences = [...source.matchAll(new RegExp(propertyName, "g"))];

  const topLevelMatches = [];
  let depth = 0;
  let quote = null;
  let lineComment = false;
  let blockComment = false;

  for (let offset = 0; offset < databaseBody.length; offset += 1) {
    const char = databaseBody[offset];
    const next = databaseBody[offset + 1];
    const previous = databaseBody[offset - 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        offset += 1;
      }
      continue;
    }

    if (quote) {
      if (char === quote && previous !== "\\") {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      offset += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      offset += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (depth === 0 && databaseBody.startsWith(propertyName, offset)) {
      const before = databaseBody[offset - 1] ?? "\n";
      const after = databaseBody[offset + propertyName.length] ?? "";
      if (!/[A-Za-z0-9_$]/.test(before) && after === ":") {
        topLevelMatches.push(databaseOpen + 1 + offset);
      }
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth < 0) {
        throw new Error(`${label}: unexpected closing brace in Database type.`);
      }
    }
  }

  if (topLevelMatches.length > 1) {
    throw new Error(
      `${label}: more than one top-level ${propertyName} property.`,
    );
  }

  const unexpectedOccurrences = allOccurrences.filter((match) => {
    const index = match.index ?? -1;
    const helperReferenceStart = index - 'Omit<Database, "'.length;
    const helperReference = source.slice(
      helperReferenceStart,
      helperReferenceStart + 'Omit<Database, "__InternalSupabase">'.length,
    );

    return (
      topLevelMatches[0] !== index &&
      helperReference !== 'Omit<Database, "__InternalSupabase">'
    );
  });

  if (unexpectedOccurrences.length > 0) {
    throw new Error(
      `${label}: ${propertyName} appears outside Database top level or DatabaseWithoutInternals helper.`,
    );
  }

  if (topLevelMatches.length === 0) {
    return source;
  }

  const propertyStart = topLevelMatches[0];
  const propertyBrace = source.indexOf("{", propertyStart);
  if (propertyBrace === -1 || propertyBrace > databaseClose) {
    throw new Error(`${label}: could not parse ${propertyName} property.`);
  }

  const propertyEndBrace = findMatchingBrace(source, propertyBrace);
  let removeEnd = propertyEndBrace + 1;
  if (source[removeEnd] === ",") {
    removeEnd += 1;
  }
  if (source[removeEnd] === "\r" && source[removeEnd + 1] === "\n") {
    removeEnd += 2;
  } else if (source[removeEnd] === "\n") {
    removeEnd += 1;
  }

  const removeStart = removeLeadingComments(
    source,
    propertyStart,
    databaseOpen + 1,
  );

  const prefix = source.slice(0, removeStart);
  const joiner = prefix.endsWith("\n") ? "" : "\n";

  return normalizeFileBoundaries(
    `${prefix}${joiner}${source.slice(removeEnd)}`,
  );
};

const normalizeFileBoundaries = (source) =>
  source.replace(/\r\n/g, "\n").replace(/\n+$/u, "\n");

let expected;
let actual;

try {
  expected = normalizeGeneratedTypes(
    normalizeFileBoundaries(readFileSync(resolve(expectedPath), "utf8")),
    expectedPath,
  );
  actual = normalizeGeneratedTypes(
    normalizeFileBoundaries(readFileSync(resolve(actualPath), "utf8")),
    actualPath,
  );
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (expected !== actual) {
  const expectedLines = expected.split("\n");
  const actualLines = actual.split("\n");
  const firstDifferentLine =
    expectedLines.findIndex((line, index) => line !== actualLines[index]) + 1;

  fail(
    `Supabase generated type drift detected after removing only top-level Database.__InternalSupabase. First different normalized line: ${firstDifferentLine}. Expected: ${JSON.stringify(expectedLines[firstDifferentLine - 1] ?? "")}. Actual: ${JSON.stringify(actualLines[firstDifferentLine - 1] ?? "")}.`,
  );
}

console.log(
  "Supabase generated types match after removing top-level Database.__InternalSupabase.",
);
