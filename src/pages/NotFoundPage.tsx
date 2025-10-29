import MeldPreview from "../components/MeldPreview/MeldPreview";
import type { Tile } from "../domain/types";

const tiles404: { tile: Tile; caption: string }[] = [
  { tile: { suit: "bamboo", value: "4" }, caption: "4" },
  { tile: { suit: "dragon", value: "white" }, caption: "0" },
  { tile: { suit: "bamboo", value: "4" }, caption: "4" },
];

const NotFoundPage: React.FC = () => {
  return (
    <>
      <div
        style={{
          width: "50%",
          backgroundColor: "#5f005f",
          borderRadius: "64px",
          padding: "24px",
          margin: "16px",
        }}
      >
        <MeldPreview tiles={tiles404} />
      </div>
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
