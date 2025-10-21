const NotFoundPage: React.FC = () => {
  return (
    <>
      Oh no! Looks like you're lost... Here are some links you may have been
      looking for:
      <ul>
        {[
          "/",
          "/score",
          "/score/rules",
          "/game/create",
          "/game/join",
          "/game/1",
        ].map((url) => (
          <li key={url}>
            <a href={url}>{url}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotFoundPage;
