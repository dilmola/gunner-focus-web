import Card from "../card";

const ResultsCard = () => {
  return (
    <Card
      title="Results"
      bgColor="#F6F6F6"
      textColor="#000000"
      teams={["Arsenal", "Chelsea"]}
      scores={[
        [2, 2],
        [1, 3],
      ]} // Array of score pairs
    />
  );
};

export default ResultsCard;
