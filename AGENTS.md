# Security Review Follow-Ups (Deferred)

These items were identified during the security review but are intentionally deferred
based on the single-owner deployment model and your stated priorities.

1. Authorization roles beyond "any session"
Reason: Single-owner model means any valid login equals admin. We can revisit if you
ever want separate roles (admin vs. viewer) for multi-user instances.

2. Reduce runtime logging of DB/results
Reason: Deprioritized for now due to single-owner intent. If logs will be centralized
or shared, we should gate logs behind `NODE_ENV === 'development'`.

3. Validate admin write payloads
Reason: You deferred for now. Adds stronger guarantees against malformed or oversized
inputs, but not essential for single-owner if admin UI is trusted.

4. Upload safeguards (size limits, file signature checks, randomized filenames)
Reason: Deferred per your guidance. Useful for hardening if uploads are exposed to
any untrusted users in the future.

5. Abuse controls on contact endpoint
Reason: You plan to address later. Would add rate limiting or CAPTCHA to prevent spam.
