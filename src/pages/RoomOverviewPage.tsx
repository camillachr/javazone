import RoomList from "../components/rooms/RoomList";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const RoomOverviewPage = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { isLoading } = context;

  return (
    <div>
      <h1>Rooms</h1>
      {isLoading ? <p>Loading...</p> : <RoomList />}
    </div>
  );
};

export default RoomOverviewPage;
