import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext, Talk } from "../context/DataContext";
import { updateTalk, deleteTalk } from "../services/TalksService"; // Import deleteTalk
import { useAuth } from "../../src/context/AuthContext";

const TalksDetailePage = () => {
  const { isAuthenticated } = useAuth();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { talks, setTalks } = context;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const talk = talks.find((t) => t._uuid === id);
  const [formData, setFormData] = useState<Talk>(talk || {} as Talk);

  useEffect(() => {
    if (talk) {
      setFormData(talk);
    }
  }, [talk]);

  if (!talk) {
    return <p>Talk not found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        await updateTalk(id, formData);
        setTalks((prev) =>
          prev.map((t) => (t._uuid === id ? { ...t, ...formData } : t))
        );
        navigate('/talks');
      } catch (error) {
        console.error("Failed to update talk", error);
      }
    }
  };

  const handleDelete = async () => {
    if (isAuthenticated) {
      try {
        await deleteTalk(id);
        setTalks((prev) => prev.filter((t) => t._uuid !== id));
        navigate('/talks');
      } catch (error) {
        console.error("Failed to delete talk", error);
      }
    }
  };

  return (
    <div className="edit-talk-form">
      <h1>Edit Talk</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="speakerId">Speaker ID:</label>
          <input
            type="text"
            id="speakerId"
            name="speakerId"
            value={formData.speakerId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="roomId">Room ID:</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default TalksDetailePage;