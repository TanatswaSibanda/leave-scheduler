

# Decision 1 – 30% Team Leave Rule

*Decision*

I interpreted the rule "No more than 30% of any team may be on leave on the same working day" by rounding 30% down using `Math.floor()`. Since each team contains five employees, only one employee from a team can have approved leave on the same working day.

*Alternatives Considered*

* Rounding up using `Math.ceil()`.
* Rounding to the nearest whole number.

*Reasoning*

I chose `Math.floor()` because it guarantees that the number of employees on leave never exceeds the stated 30% limit.



# Decision 2 – Public Holidays and Weekends

*Decision*

Public holidays and weekends do not prevent employees from requesting or being approved for leave. Public holidays are stored in the database for future use, but they do not affect approval because the application does not manage employee leave balances.

*Alternatives Considered*

* Automatically remove weekends and public holidays from the leave period.
* Automatically extend leave by the number of public holidays.

*Reasoning*

The project brief states that public holidays do not count against an employee's leave balance, but this application does not implement leave balances. I therefore chose to allow leave requests that include weekends or public holidays while documenting this interpretation.



# Decision 3 – Overlapping Leave Requests

*Decision*

Only approved leave requests are considered when checking for overlapping leave. Pending requests do not block new requests.

*Alternatives Considered*

* Prevent overlapping pending requests.
* Prevent any overlapping request regardless of status.

*Reasoning*

Managers are responsible for approving or rejecting pending requests. Allowing multiple pending requests provides flexibility while ensuring that conflicting approved leave cannot exist for the same employee.
