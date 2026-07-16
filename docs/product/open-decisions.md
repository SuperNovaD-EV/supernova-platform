# Open Decisions

## Purpose

Maintain a controlled register of unresolved external, operational, legal, financial, and provider decisions.

## Scope

Open decisions may block production launch or later implementation phases, but non-critical external decisions do not block Phase 1 documentation completion.

## Status Values

| Status                       | Meaning                                                              |
| ---------------------------- | -------------------------------------------------------------------- |
| TBD                          | Decision not yet made.                                               |
| Researching                  | Inputs are being gathered.                                           |
| Requires professional review | Legal, tax, insurance, compliance, or data protection review needed. |
| Provider selection needed    | A vendor or integration must be selected.                            |
| Operations approval needed   | Internal policy or staffing approval needed.                         |

## Register

| ID     | Title                                     | Impact                                                           | Owner                     | Required by phase                        | Current assumption                                                                               | Safe default behavior                                                               | Status                       |
| ------ | ----------------------------------------- | ---------------------------------------------------------------- | ------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------------- |
| OD-001 | Transport and marketplace legal structure | Launch legality, contracts, driver classification, permits.      | Platform Owner            | Before production operations             | SuperNova is a marketplace connecting riders with independent drivers; classification not final. | Do not launch without professional review.                                          | Requires professional review |
| OD-002 | Final vehicle categories permitted by law | Vehicle eligibility, insurance, dispatch, pricing.               | Operations Manager        | Before vehicle onboarding implementation | Architecture supports configurable legal private-vehicle categories.                             | Keep categories configurable and disabled until approved.                           | Requires professional review |
| OD-003 | Payment provider                          | Payment implementation, refunds, chargebacks, reconciliation.    | Finance Agent             | Before payment implementation            | Online-only MVP payment architecture.                                                            | Do not implement provider-specific payment code.                                    | Provider selection needed    |
| OD-004 | Payout provider                           | Driver withdrawals, daily payout, KYC, reconciliation.           | Finance Agent             | Before payout implementation             | Payout states and ledger are provider-neutral.                                                   | Do not promise instant transfer.                                                    | Provider selection needed    |
| OD-005 | Exact commission values                   | Business model, driver earnings, legal disclosure.               | Platform Owner            | Before pricing implementation            | Small commission expected, exact value unapproved.                                               | Store commission as configurable versioned profile.                                 | Operations approval needed   |
| OD-006 | Exact fare values                         | Pricing, estimates, launch economics.                            | Operations Manager        | Before pricing implementation            | Fare components are configurable.                                                                | Do not hardcode fare values.                                                        | Operations approval needed   |
| OD-007 | Withdrawal fees                           | Driver net payout, disclosures.                                  | Finance Agent             | Before payout implementation             | Fees may depend on provider.                                                                     | Display fees only after approved configuration.                                     | Provider selection needed    |
| OD-008 | Daily payout time                         | Driver expectations, provider batch windows.                     | Finance Agent             | Before payout implementation             | Scheduled in Africa/Cairo.                                                                       | Keep payout time configurable.                                                      | Operations approval needed   |
| OD-009 | Reserve policy                            | Fraud, chargebacks, driver availability of funds.                | Finance Agent             | Before ledger implementation             | Reserve holds may be needed.                                                                     | Model reserved balance without enabling holds by default.                           | Operations approval needed   |
| OD-010 | Insurance model                           | Rider/driver protection, accident handling, vehicle eligibility. | Platform Owner            | Before production operations             | Insurance integration not selected.                                                              | Do not claim insurance coverage.                                                    | Requires professional review |
| OD-011 | Official government-verification access   | Automated identity/license validation.                           | Platform Owner            | Before authority integration             | No lawful integration assumed.                                                                   | Use document checks and manual review only.                                         | Requires professional review |
| OD-012 | Customer support staffing                 | SLAs, escalation, safety coverage.                               | Operations Manager        | Before support operations                | Manual review required for financial/safety/ambiguous cases.                                     | Mark SLAs provisional.                                                              | Operations approval needed   |
| OD-013 | Emergency-service integration             | SOS behavior and external escalation.                            | Safety Investigator       | Before production safety escalation      | External integration TBD.                                                                        | Provide in-app safety workflow without claiming emergency dispatch.                 | Requires professional review |
| OD-014 | Data retention periods                    | Privacy, evidence, legal compliance, deletion.                   | Platform Owner            | Before schema implementation             | Retention classes are documented but exact periods TBD.                                          | Use conservative access controls; avoid irreversible deletion rules until reviewed. | Requires professional review |
| OD-015 | Compensation limits                       | Financial exposure, fairness, support decisions.                 | Finance Agent             | Before support implementation            | Compensation requires approval and source.                                                       | Keep limits configurable and require manual approval.                               | Operations approval needed   |
| OD-016 | Appeal time limits                        | User rights, support SLAs, legal fairness.                       | Customer Resolution Agent | Before support implementation            | Appeals are supported where appropriate.                                                         | Keep windows configurable.                                                          | Operations approval needed   |
| OD-017 | Production SLA                            | Availability, support expectations, provider contracts.          | Platform Owner            | Before production operations             | Phase 1 targets are provisional.                                                                 | Do not publish final SLA.                                                           | Operations approval needed   |
| OD-018 | Infrastructure scaling thresholds         | Cost controls, reliability, database sizing.                     | Platform Owner            | Before production operations             | Cost controls are required.                                                                      | Keep alerts and scaling thresholds provisional.                                     | Operations approval needed   |

## Business Rules

- Open decisions must not be hidden in prose.
- Implementation phases must check this register before selecting providers, hardcoding values, or claiming compliance.
- Production launch cannot proceed while launch-blocking legal, payment, payout, insurance, safety, and data decisions remain unresolved.

## Acceptance Criteria

- Each open decision has ID, title, impact, owner, required-by phase, current assumption, safe default behavior, and status.
