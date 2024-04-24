export class FluentBusinesses {
    data;
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
    fromCityInState(city, state) {
        let businessArray = this.data.filter(e => e.city === city && e.state === state);
        return new FluentBusinesses(businessArray);
    }
    hasStarsGeq(stars) {
        let businesses = [];
        this.data.forEach((e) => {
            if (e.stars === undefined) {
                return;
            }
            if (e.stars >= stars) {
                businesses.push(e);
            }
        });
        return new FluentBusinesses(businesses);
    }
    inCategory(category) {
        let result = [];
        this.data.forEach((e) => {
            if (e.categories === undefined) {
                return;
            }
            if (e.categories.indexOf(category) !== -1) {
                result.push(e);
            }
        });
        return new FluentBusinesses(result);
    }
    hasHoursOnDays(days) {
        let result = [];
        this.data.forEach((e) => {
            if (e.hours !== undefined && days.every(x => x in e.hours)) {
                result.push(e);
            }
            else {
                return;
            }
        });
        return new FluentBusinesses(result);
    }
    hasAmbience(ambience) {
        let result = [];
        this.data.filter(e => {
            if (e.attributes !== undefined &&
                e.attributes.Ambience !== undefined &&
                e.attributes.Ambience[ambience] === true) {
                result.push(e);
            }
        });
        return new FluentBusinesses(result);
    }
    bestPlace() {
        let bestBusiness = undefined;
        let bestStar = -Infinity;
        let bestRevCnt = -Infinity;
        this.data.forEach(business => {
            let currentStar = business.stars || 0;
            let currRevCnt = business.review_count || 0;
            if (currentStar > bestStar || (currentStar === bestStar && currRevCnt > bestRevCnt)) {
                bestBusiness = business;
                bestStar = currentStar;
                bestRevCnt = currRevCnt;
            }
        });
        return bestBusiness;
    }
    mostReviews() {
        // TODO
        const mostReviewed = this.data.reduce((prevBest, current) => {
            const currRevCnt = current.review_count || 0;
            const prevBestRevCnt = prevBest?.review_count || 0;
            if (currRevCnt > prevBestRevCnt) {
                return current;
            }
            return prevBest;
        }, undefined);
        return mostReviewed;
    }
}
//# sourceMappingURL=FluentBusinesses.js.map