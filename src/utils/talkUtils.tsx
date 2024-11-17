import { getTalks, createTalk } from "../services/TalksService";

export const createInitialTalks = async () => {
  try {
  const existingTalks = await getTalks();

  if (existingTalks.length === 0) {
    const defaultTalks = [
      {
        title: "HTML",
   
        time: "20:00"
        
      },
      {
        title: "CSS",
      
        time: "12:00"
        
      }];
      
      for(const talk of defaultTalks){
        const result = await createTalk(talk);
        if(result){
          console.log(`Created talk: ${talk.title}`);
        }
      }
     }
    }catch (error) {
      console.error("Error in createInitialTalks:", error);
 } 

};

    