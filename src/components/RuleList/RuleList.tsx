import { useMemo } from "react";
import useScoringRules from "../../hooks/api/useScoringRules";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./RuleList.module.scss";
import { Link } from "react-router-dom";

const RuleList = () => {
  const { rules, error, loading } = useScoringRules();

  const sortedRules = useMemo(
    () =>
      [...rules].sort(
        ({ score_value: scoreA }, { score_value: scoreB }) => scoreA - scoreB
      ),
    [rules]
  );

  return (
    <div>
      <h2>
        Here are the rules implemented so far (from{" "}
        <Link
          to={"http://mahjong.wikidot.com/rules:hong-kong-old-style-scoring"}
          target="_blank"
        >
          Hong-Kong Old Style rules
        </Link>
        ):
      </h2>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        "We encountered an error. Please try again later"
      ) : (
        <ul className={styles.ruleList}>
          {sortedRules.map(({ description, score_value, slug, supersedes }) => (
            <li key={slug} id={slug} className={styles.rule}>
              <h3 className={styles.ruleTitle}>
                {slug} - value: {score_value}
              </h3>
              {description}
              {supersedes?.length === 0 ? null : (
                <>
                  <br />
                  <br />
                  Supersedes:
                  <ul className={styles.supersedesList}>
                    {supersedes?.map((slug) => {
                      return (
                        <li key={slug}>
                          <a href={`#${slug}`}>{slug}</a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              {/* <MeldPreview tiles={Array(14).fill({ miscTileSlug: "any" })} /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleList;
