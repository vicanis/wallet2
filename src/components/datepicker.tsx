import { Fragment, useRef, useState } from "react";
import dayjs from "../lib/dayjs";

export default function DatePicker({
    value: initValue,
    formatter,
    onChange,
}: {
    value: string;
    formatter: (date: dayjs.Dayjs) => string;
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
                {formatter(dayjs(date))}
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
