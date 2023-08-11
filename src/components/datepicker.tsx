import { Fragment, useRef, useState } from "react";
import dayjs from "../lib/dayjs";

export default function DatePicker({
    value: initValue,
    formatter = DefaultFormatter,
    onChange,
}: {
    value: string;
    formatter?: (date: Date) => string;
    onChange: (date: Date) => void;
}) {
    const ref = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState<Date>(dayjs(initValue).toDate());

    return (
        <Fragment>
            <span
                onClick={() => {
                    if (ref.current === null) {
                        return;
                    }

                    ref.current.showPicker();
                }}
                className="first-letter:uppercase"
            >
                {formatter(date)}
            </span>
            <input
                ref={ref}
                className="hidden"
                type="datetime-local"
                defaultValue={date.toString()}
                onChange={(event) => {
                    const value = event.target.value;
                    const date = dayjs(value).toDate();
                    setDate(date);
                    onChange(date);

                    if (ref.current === null) {
                        return;
                    }

                    ref.current.blur();
                }}
            />
        </Fragment>
    );
}

function DefaultFormatter(date: Date) {
    return dayjs(date).calendar(dayjs(), {
        sameDay: "[Сегодня в] HH:mm",
        nextDay: "[Завтра в] HH:mm",
        nextWeek: "[След.] dddd [в] HH:mm",
        lastDay: "[Вчера в] HH:mm",
        lastWeek: "[Пред.] dddd [в] HH:mm",
        sameElse: "DD MMMM YYYY",
    });
}
