# State Machines

Phase 1 defines canonical domain state machines before implementation. The canonical files are:

- [Ride State Machine](ride-state-machine.md)
- [Payment State Machine](payment-state-machine.md)
- [Payout State Machine](payout-state-machine.md)
- [Driver Verification State Machine](driver-verification-state-machine.md)
- [Vehicle State Machine](vehicle-state-machine.md)
- [Complaint State Machine](complaint-state-machine.md)

Rules shared by every state machine:

- Clients may request transitions but server-side domain logic validates sensitive transitions.
- Transitions must be idempotent where retries are expected.
- Sensitive transitions require reason codes, timestamps, audit events, and authorization.
- Terminal states cannot silently return to active states.
- Corrective workflows create audited correction records instead of rewriting history.
