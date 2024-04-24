import type { Business } from "../include/data.js";

export class FluentBusinesses {
  private data: Business[];

  constructor(data: Business[]) {
    this.data = data;
  }

  getData(): Business[] {
    return this.data;
  }

  fromCityInState(city: string, state: string): FluentBusinesses {
    let businessArray = this.data.filter(e => e.city === city && e.state === state);
    return new FluentBusinesses(businessArray);
  }

  hasStarsGeq(stars: number): FluentBusinesses {
    let businesses: Business[] = [];
    this.data.forEach((e: Business) => {
      if (e.stars === undefined) {
        return;
      }
      if (e.stars >= stars) {
        businesses.push(e);
      }
    });
    return new FluentBusinesses(businesses);
  }

  inCategory(category: string): FluentBusinesses {
    let result: Business[] = [];
    this.data.forEach((e: Business) => {
      if (e.categories === undefined) {
        return;
      }
      if (e.categories.indexOf(category) !== -1) {
        result.push(e);
      }
    });
    return new FluentBusinesses(result);
  }

  hasHoursOnDays(days: string[]): FluentBusinesses {
    let result: Business[] = [];
    this.data.forEach((e: Business) => {
      if (e.hours !== undefined && days.every(x => x in e.hours!)) {
        result.push(e);
      } else {
        return;
      }
    });
    return new FluentBusinesses(result);
  }

  hasAmbience(ambience: string): FluentBusinesses {
    let result: Business[] = [];
    this.data.filter(e => {
      if (
        e.attributes !== undefined &&
        e.attributes.Ambience !== undefined &&
        e.attributes.Ambience[ambience] === true
      ) {
        result.push(e);
      }
    });
    return new FluentBusinesses(result);
  }

  bestPlace(): Business | undefined {
    let bestBusiness: Business | undefined = undefined;
    let bestStar: number = -Infinity;
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

  mostReviews(): Business | undefined {
    // TODO
    const mostReviewed = this.data.reduce((prevBest: Business | undefined, current: Business) => {
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
