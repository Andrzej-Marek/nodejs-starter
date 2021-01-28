import moment from "moment";

export class TimeMachine {
    static getDateNDaysBeforeToday(dayDifference: number): Date {
        return moment().subtract(dayDifference, "days").toDate();
    }

    static getDateNDaysAfterToday(dayDifference: number): Date {
        return moment().add(dayDifference, "days").toDate();
    }

    static getTodaysDate(): Date {
        return moment().toDate();
    }

    static getCurrentTimestamp(): string {
        return moment().format("X");
    }

    static formatDate(date: string | Date, format: string): string {
        return moment(date).format(format);
    }

    static isBefore(first: Date, second: Date): boolean {
        return moment(second).isBefore(first);
    }
}
