# Contributing

SignalDesk favors focused changes that preserve existing behavior. Before committing a change, run the relevant unit tests, TypeScript check, production build, and browser test when the interaction crosses routing, focus, keyboard, or asynchronous UI behavior.

Keep feature code within the existing ownership boundaries where practical. Avoid dependency additions for behavior that can be expressed clearly with the current React and browser primitives.
