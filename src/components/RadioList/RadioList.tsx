import { cx } from "../../utils/classNames";
import styles from "./RadioList.module.scss";

export type RadioType<T> = { value: T; label: React.ReactNode };

interface RadioListProps<T extends string> {
  onChange: (newValue: T) => void;
  selected: T | null;
  radios: RadioType<T>[];
  id: string;
  legend?: string;
  className?: string;
}

const RadioList = <T extends string>({
  onChange,
  radios,
  selected,
  id,
  legend,
  className,
}: RadioListProps<T>) => {
  return (
    <fieldset className={cx(styles.radioPills, className)}>
      {legend && <legend className={"sr-only"}>{legend}</legend>}
      {radios.map(({ value, label }) => (
        <label className={styles.pill} key={value}>
          <input
            type="radio"
            checked={selected === value}
            value={value}
            name={`radio-${id}-type`}
            onChange={() => {
              onChange(value);
            }}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioList;
