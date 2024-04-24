import assert from "assert";
import { FluentBusinesses } from "./FluentBusinesses";
const testData = [
    {
        business_id: "abcd",
        name: "Applebee's",
        city: "Charlotte",
        state: "NC",
        stars: 4,
        review_count: 6,
    },
    {
        business_id: "abcd",
        name: "China Garden",
        state: "NC",
        city: "Charlotte",
        stars: 4,
        review_count: 10,
        attributes: { Ambience: { fancy: true } },
    },
    {
        business_id: "abcd",
        name: "Beach Ventures Roofing",
        state: "AZ",
        city: "Phoenix",
        stars: 3,
        review_count: 30,
        categories: ["roofing", "construction"],
    },
    {
        business_id: "abcd",
        name: "Alpaul Automobile Wash",
        city: "Charlotte",
        state: "NC",
        stars: 3,
        review_count: 30,
        hours: {
            Monday: "0:0-0:0",
            Tuesday: "8:0-18:30",
            Wednesday: "8:0-18:30",
            Thursday: "8:0-18:30",
            Friday: "8:0-18:30",
            Saturday: "8:0-14:0",
        },
    },
];
describe("fromCityInState", () => {
    it("filters correctly", () => {
        const list = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").getData();
        assert(list.length === 3);
        assert(list[0].name === "Applebee's");
        assert(list[1].name === "China Garden");
        assert(list[2].name === "Alpaul Automobile Wash");
    });
});
describe("bestPlace", () => {
    it("break tie with review count", () => {
        const best = new FluentBusinesses(testData).fromCityInState("Charlotte", "NC").bestPlace();
        assert(best);
        assert(best.name === "China Garden");
    });
});
describe("hasStarsGeq", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).hasStarsGeq(2).getData();
        assert(result.length === 4);
    });
});
describe("inCategory", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).inCategory("construction").getData();
        assert(result.length === 1);
    });
});
describe("hasHoursOnDays", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).hasHoursOnDays(["Friday", "Wednesday"]).getData();
        console.log(result.length);
        assert(result.length === 1);
    });
});
describe("hasAmbience", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).hasAmbience("fancy").getData();
        console.log(result.length);
        assert(result.length === 1);
    });
});
describe("bestPlace", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).bestPlace();
        console.log(result);
        assert(result?.name === "China Garden");
    });
});
describe("mostReviews", () => {
    it("filters correctly", () => {
        let result = new FluentBusinesses(testData).mostReviews();
        assert(result?.name === "Beach Ventures Roofing");
    });
});
//# sourceMappingURL=FluentBusinesses.test.js.map