# Screen Inventory

## Canonical Decisions

This inventory covers MVP and deferred screens. It links to Phase 1 journeys instead of redefining ride, payment, payout, verification, or complaint state machines.

## Inventory

| ID    | Route                        | Platform        | Purpose              | Primary action | Entry      | Exit               | Major states         | RTL | Accessibility            | Status |
| ----- | ---------------------------- | --------------- | -------------------- | -------------- | ---------- | ------------------ | -------------------- | --- | ------------------------ | ------ |
| R-01  | `/` splash                   | Rider           | Brand entry          | Continue       | App launch | Language           | splash               | Yes | Large action             | MVP    |
| R-02  | language                     | Rider           | Locale choice        | Continue       | Splash     | Onboarding         | en/ar                | Yes | Button labels            | MVP    |
| R-03  | onboarding                   | Rider           | Value preview        | Sign in        | Language   | Phone              | light/dark           | Yes | Readable copy            | MVP    |
| R-04  | sign-in                      | Rider           | Phone visual         | Send code      | Onboarding | OTP                | default/error        | Yes | Field label              | MVP    |
| R-05  | otp                          | Rider           | OTP visual           | Verify         | Sign-in    | Location           | default/error        | Yes | Code label               | MVP    |
| R-06  | location                     | Rider           | Permission education | Open map       | OTP        | Home               | explained/denied     | Yes | No forced permission     | MVP    |
| R-07  | home                         | Rider           | Map home             | Search         | Location   | Search             | idle/offline         | Yes | One clear action         | MVP    |
| R-08  | search                       | Rider           | Destination          | Confirm        | Home       | Pickup             | empty/results        | Yes | Search label             | MVP    |
| R-09  | pickup                       | Rider           | Pickup adjust        | Choose vehicle | Search     | Vehicles           | adjusted/confirmed   | Yes | Map summary              | MVP    |
| R-10  | vehicles                     | Rider           | Category select      | Review fare    | Pickup     | Fare               | selected/unavailable | Yes | Non-color status         | MVP    |
| R-11  | fare                         | Rider           | Estimate review      | Confirm        | Vehicles   | Searching          | valid/expired        | Yes | Currency text            | MVP    |
| R-12  | searching                    | Rider           | Matching             | Wait           | Fare       | Assigned/no-driver | searching            | Yes | Motion reduced           | MVP    |
| R-13  | assigned                     | Rider           | Driver details       | Track          | Searching  | Arriving           | assigned             | Yes | Vehicle text             | MVP    |
| R-14  | arriving                     | Rider           | Arrival tracking     | Continue       | Assigned   | Arrived            | ETA/stale            | Yes | Status text              | MVP    |
| R-15  | arrived                      | Rider           | Verify vehicle       | Verify         | Arriving   | QR/PIN             | arrived              | Yes | Clear actions            | MVP    |
| R-16  | verify-choice                | Rider           | Start method         | Use PIN        | Arrived    | PIN                | QR/PIN               | Yes | Fallback                 | MVP    |
| R-17  | pin                          | Rider           | PIN start            | Start          | Choice     | Active             | valid/error          | Yes | Numeric clarity          | MVP    |
| R-18  | active                       | Rider           | Active trip          | Safety         | PIN        | Safety             | in progress          | Yes | Safety access            | MVP    |
| R-19  | safety                       | Rider           | Safety center        | Share          | Active     | Share              | protected/SOS        | Yes | Emergency hold           | MVP    |
| R-20  | share                        | Rider           | Trusted contact      | Complete       | Safety     | Completed          | shared               | Yes | Privacy text             | MVP    |
| R-21  | completed                    | Rider           | Completion           | Payment        | Share      | Payment            | complete             | Yes | Receipt summary          | MVP    |
| R-22  | payment                      | Rider           | Payment result       | Rate           | Completed  | Rating             | captured/failed      | Yes | Financial text           | MVP    |
| R-23  | rating                       | Rider           | Rate/report          | History        | Payment    | History            | rating/report        | Yes | Support link             | MVP    |
| R-24  | history                      | Rider           | Trip list            | Profile        | Rating     | Profile            | empty/list           | Yes | Table/list labels        | MVP    |
| R-25  | profile                      | Rider           | Settings             | Restart        | History    | Home               | locale/theme         | Yes | Controls labeled         | MVP    |
| D-01  | `/` splash                   | Driver          | Brand entry          | Start          | App launch | Welcome            | splash               | Yes | Large action             | MVP    |
| D-02  | welcome                      | Driver          | Apply intro          | Verify phone   | Splash     | Phone              | default              | Yes | Clear copy               | MVP    |
| D-03  | phone                        | Driver          | Phone OTP            | Continue       | Welcome    | Personal           | default/error        | Yes | Field label              | MVP    |
| D-04  | personal                     | Driver          | Details              | Upload ID      | Phone      | Identity           | draft                | Yes | Labels                   | MVP    |
| D-05  | identity                     | Driver          | ID upload visual     | Selfie         | Personal   | Selfie             | uploaded/error       | Yes | No real upload           | MVP    |
| D-06  | selfie                       | Driver          | Liveness visual      | License        | Identity   | License            | visual               | Yes | No camera required       | MVP    |
| D-07  | license                      | Driver          | License evidence     | Vehicle        | Selfie     | Vehicle            | visual               | Yes | Labels                   | MVP    |
| D-08  | vehicle                      | Driver          | Vehicle info         | Photos         | License    | Photos             | draft                | Yes | Field labels             | MVP    |
| D-09  | photos                       | Driver          | Vehicle review       | Payout         | Vehicle    | Payout             | visual               | Yes | Evidence text            | MVP    |
| D-10  | payout                       | Driver          | Payout setup         | Submit         | Photos     | Submitted          | visual               | Yes | Financial labels         | MVP    |
| D-11  | submitted                    | Driver          | Submitted            | Review         | Payout     | Review             | submitted            | Yes | Status text              | MVP    |
| D-12  | review                       | Driver          | Under review         | Approved       | Submitted  | Approved           | under review         | Yes | Reason text              | MVP    |
| D-13  | approved                     | Driver          | Approved             | Home           | Review     | Offline            | approved             | Yes | Status text              | MVP    |
| D-14  | offline                      | Driver          | Offline home         | Go online      | Approved   | Online             | offline              | Yes | Large toggle             | MVP    |
| D-15  | online                       | Driver          | Online home          | Wait           | Offline    | Incoming           | online               | Yes | GPS/network status       | MVP    |
| D-16  | incoming                     | Driver          | Offer                | Details        | Online     | Details            | offer                | Yes | Large action             | MVP    |
| D-17  | details                      | Driver          | Offer details        | Accept         | Incoming   | Accepted           | offer                | Yes | No dense UI              | MVP    |
| D-18  | accepted                     | Driver          | Assignment           | Navigate       | Details    | Pickup             | assigned             | Yes | Route summary            | MVP    |
| D-19  | pickup                       | Driver          | Navigation           | Arrived        | Accepted   | Arrived            | en route             | Yes | Minimal UI               | MVP    |
| D-20  | arrived                      | Driver          | Arrival              | Wait           | Pickup     | Waiting            | arrived              | Yes | Large action             | MVP    |
| D-21  | waiting                      | Driver          | Timer                | Verify         | Arrived    | Verify             | waiting              | Yes | Timer text               | MVP    |
| D-22  | verify                       | Driver          | QR/PIN               | Start          | Waiting    | Active             | verified             | Yes | Fallback                 | MVP    |
| D-23  | active                       | Driver          | Active trip          | Complete       | Verify     | Completed          | active               | Yes | Low distraction          | MVP    |
| D-24  | completed                    | Driver          | Completion           | Earnings       | Active     | Summary            | complete             | Yes | Earnings text            | MVP    |
| D-25  | summary                      | Driver          | Earnings             | Dashboard      | Completed  | Earnings           | net/gross            | Yes | Money text               | MVP    |
| D-26  | earnings                     | Driver          | Earnings dashboard   | Ledger         | Summary    | Ledger             | chart                | Yes | Chart summary            | MVP    |
| D-27  | ledger                       | Driver          | Ledger               | Payout         | Earnings   | Payout             | entries              | Yes | List labels              | MVP    |
| D-28  | payout-request               | Driver          | Withdrawal           | Support        | Ledger     | Support            | queued               | Yes | Financial labels         | MVP    |
| D-29  | support                      | Driver          | Support              | Profile        | Payout     | Profile            | category             | Yes | Category labels          | MVP    |
| D-30  | profile                      | Driver          | Settings             | Restart        | Support    | Start              | controls             | Yes | Controls labeled         | MVP    |
| A-01  | `/dashboard`                 | Admin           | Overview             | Investigate    | Login      | Details            | normal/alert         | Yes | Headings/tables          | MVP    |
| A-02  | `/live-operations`           | Admin           | Live ops             | Filter         | Dashboard  | Ride/zone          | normal/alert         | Yes | Map text                 | MVP    |
| A-03  | `/drivers`                   | Admin           | Driver list          | Review         | Nav        | Application        | list/filter          | Yes | Table                    | MVP    |
| A-04  | `/drivers/applications`      | Admin           | Queue                | Assign         | Drivers    | Detail             | queue                | Yes | Table                    | MVP    |
| A-05  | `/drivers/applications/[id]` | Admin           | Review               | Decide         | Queue      | Audit              | review               | Yes | Evidence labels          | MVP    |
| A-06  | `/rides`                     | Admin           | Ride list            | Open           | Nav        | Detail             | list/filter          | Yes | Table                    | MVP    |
| A-07  | `/rides/[id]`                | Admin           | Investigation        | Review         | Rides      | Complaint          | timeline             | Yes | Evidence labels          | MVP    |
| A-08  | `/incidents`                 | Admin           | Safety               | Escalate       | Nav        | Case               | alert                | Yes | No red overload          | MVP    |
| A-09  | `/complaints`                | Admin           | Cases                | Assign         | Nav        | Detail             | queue                | Yes | Table                    | MVP    |
| A-10  | `/complaints/[id]`           | Admin           | Complaint review     | Decide         | Cases      | Closure            | review               | Yes | Evidence labels          | MVP    |
| A-11  | `/payments`                  | Admin           | Payments             | Reconcile      | Nav        | Detail             | normal/failed        | Yes | Money text               | MVP    |
| A-12  | `/payouts`                   | Admin           | Payouts              | Review         | Nav        | Detail             | queued/failed        | Yes | Money text               | MVP    |
| A-13  | `/pricing`                   | Admin           | Pricing              | Preview        | Nav        | Audit              | draft/active         | Yes | Change summary           | MVP    |
| A-14  | `/service-zones`             | Admin           | Zones                | Configure      | Nav        | Audit              | active/paused        | Yes | Map text                 | MVP    |
| A-15  | `/analytics`                 | Admin           | Analytics            | Filter         | Nav        | Export             | aggregate            | Yes | Chart summaries          | MVP    |
| A-16  | `/settings`                  | Admin           | Settings             | Review         | Nav        | Audit              | controls             | Yes | Labels                   | MVP    |
| M-01  | `/`                          | Marketing       | Homepage             | Ride/Drive     | Direct     | CTA                | responsive           | Yes | Semantic hero            | MVP    |
| M-02  | `/ride`                      | Marketing       | Rider info           | CTA            | Nav        | CTA                | responsive           | Yes | Headings                 | MVP    |
| M-03  | `/drive`                     | Marketing       | Driver info          | CTA            | Nav        | CTA                | responsive           | Yes | Headings                 | MVP    |
| M-04  | `/safety`                    | Marketing       | Safety               | Learn          | Nav        | Help               | responsive           | Yes | No absolute safety claim | MVP    |
| M-05  | `/how-it-works`              | Marketing       | Process              | CTA            | Nav        | CTA                | responsive           | Yes | Ordered content          | MVP    |
| M-06  | `/help`                      | Marketing       | Support              | Browse         | Nav        | Case               | responsive           | Yes | Help labels              | MVP    |
| M-07  | `/about`                     | Marketing       | Company              | Learn          | Nav        | Footer             | responsive           | Yes | No legal finality        | MVP    |
| DS-01 | `/design-system`             | Admin/Marketing | Component review     | Inspect        | Nav        | None               | theme/locale         | Yes | Focus states             | MVP    |
| DS-02 | `/prototype-overview`        | Admin/Marketing | Review map           | Open           | Nav        | Routes             | list                 | Yes | Links                    | MVP    |

Screen inventory count: 80.
