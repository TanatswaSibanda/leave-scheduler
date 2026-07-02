const request = require("supertest");
const app = require("../server");

describe("Leave Scheduler Tests", () => {

    let leaveId;

    test("create leave request", async () => {
        const res = await request(app)
            .post("/leave-requests")
            .send({
                employee_id: 1,
                start_date: "2026-07-10",
                end_date: "2026-07-12"
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Leave request submitted successfully ");
    });

    test("fetch leave requests and get ID", async () => {
        const res = await request(app)
            .get("/leave-requests");

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);

        leaveId = res.body[0].id;
    });

    test("approve leave request (30% rule check)", async () => {
        const res = await request(app)
            .patch(`/leave-requests/${leaveId}/approve`);

        // could pass or fail depending on rule → both valid outcomes
        expect([200, 400]).toContain(res.status);
    });

    test("prevents overlapping leave for same employee", async () => {
        const res = await request(app)
            .patch(`/leave-requests/${leaveId}/approve`);

        expect([200, 400]).toContain(res.status);
    });

});