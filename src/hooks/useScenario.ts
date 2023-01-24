import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Scenario } from "../types/Scenario";

const useScenario = () => {
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState<Scenario>();

  useEffect(() => {
    (async () => {
      const scenarioData = (await fetch(
        `/static/scenarios/${scenarioId}.json`
      ).then((res) => res.json())) as Scenario;
      setScenario(scenarioData);
    })();
  }, [scenarioId]);

  return scenario;
};

export default useScenario;
