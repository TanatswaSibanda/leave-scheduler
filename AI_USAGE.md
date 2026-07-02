
# AI Tool Used

* ChatGPT (OpenAI GPT-5.5)


# Most Useful Prompt 1

*Prompt:*

> Help me build a leave scheduler application step by step using Node.js, Express, SQLite and React. Explain each step instead of writing the whole project at once.

*Why it was useful:*

This helped me build the application incrementally while understanding each feature before moving on to the next. It also made it easier to test each component as it was implemented.

# Most Useful Prompt 2

*Prompt:*

> Help me implement and debug the business rules for leave approval, including the 30% team limit and overlapping leave requests.

*Why it was useful:*

This helped me understand the required business logic, identify implementation issues and create test scenarios to verify that the rules behaved as expected.



# One Case Where AI Was Wrong

AI initially suggested rejecting leave requests that included public holidays. After reviewing the project brief, I determined that the requirement only states that public holidays do not count against an employee's leave balance. Since this application does not implement leave balances, I decided not to reject those requests and documented my chosen interpretation in `DECISIONS.md`.

# How AI Was Used

AI was used as a development assistant throughout the project to support learning and problem-solving. It was used to:

* Explain unfamiliar concepts and technologies.
* Debug backend and frontend issues.
* Review and discuss business rule implementations.
* Suggest improvements to the application structure and user interface.
* Assist with preparing the required project documentation.

All code was integrated, tested and where necessary, modified during development. Final implementation decisions, testing and validation were completed by me before submission.
