import styles from "./TabbedContent.module.scss";

interface TabbedContentProps<T extends string = string> {
  tabs: { tabSlug: T; tabLabel: React.ReactNode; children: React.ReactNode }[];
  activeTab: T;
  onTabSelect: (newTab: T) => void;
  radioId: string;
}

const TabbedContent = <T extends string>({
  tabs,
  activeTab,
  onTabSelect,
  radioId,
}: TabbedContentProps<T>): React.ReactNode => {
  const activeContent = tabs.find(
    ({ tabSlug }) => tabSlug === activeTab
  )?.children;
  return (
    <div className={styles.tabbedContent}>
      <fieldset className={styles.tabSelector}>
        <legend className="sr-only">Select a tab to open</legend>
        {tabs.map(({ tabSlug, tabLabel }) => (
          <label key={tabSlug}>
            <input
              className="sr-only"
              type="radio"
              checked={activeTab === tabSlug}
              name={`${radioId}-suit`}
              onChange={() => onTabSelect(tabSlug)}
            />
            {tabLabel}
          </label>
        ))}
      </fieldset>
      {activeContent}
    </div>
  );
};

export default TabbedContent;
