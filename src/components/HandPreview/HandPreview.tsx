import GeneralisedTile from "../MeldPreview/GeneralisedTile";
import type { Hand } from "../../domain/hand";

interface HandPreviewProps {
  hand: Hand;
}

const HandPreview: React.FC<HandPreviewProps> = ({ hand }) => {
  return (
    <>
      {hand.tilePreviews().map((preview) => (
        <GeneralisedTile preview={preview} />
      ))}
    </>
  );
};

export default HandPreview;
