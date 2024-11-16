import { Speaker, Talk } from "../../context/DataContext";
import "./talkItem.css";

interface TalkItemProps {
  talk: Talk & { speaker?: Speaker }; // `speaker` er valgfritt
}

const TalkItem = ({ talk }: TalkItemProps) => {
  return (
    <div className="pTalkItem">
      <h2>{talk.title}</h2>
      <p>Foredragsholder: {talk.speaker ? talk.speaker.name : "Ikke spesifisert"}</p>
      <p>Tid: {talk.time}</p>
    </div>
  );
};




export default TalkItem;