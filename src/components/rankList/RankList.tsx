/**
 * Map.tsx - the main application file
 */
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAnimationFrame } from "../../app/hooks";

// Typing
type StreamerType = {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
  newScore: number;
};
type StreamerArrType = StreamerType[];
const STREAMER_DATA_URL = "https://webcdn.17app.co/campaign/pretest/data.json";
/**
 * RankList component
 * @returns {React.ReactElement}
 */
export default function RankList(): React.ReactElement {
  const [streamers, setStreamers] = useState<StreamerArrType>([]);
  // Get new streamre score
  const getNewStreamerScore = useCallback((data: StreamerArrType) => {
    return data.map((streamer: StreamerType) => {
      // 1/5 chance to update
      if (Math.round(Math.random() * 100) % 5 === 0) {
        // increment within a range of 0 - 1000
        const increaseBy = Math.round(Math.random() * 1000);
        return { ...streamer, newScore: streamer.score + increaseBy };
      }
      return streamer;
    });
  }, []);
  useEffect(() => {
    let ignore = false;
    const fetchStreamers = async () => {
      const result = await fetch(STREAMER_DATA_URL);
      const data = await result.json();
      if (!ignore) {
        console.log("result: ", data, getNewStreamerScore(data));
        setStreamers(
          getNewStreamerScore(data).sort((a, b) => b.score - a.score)
        );
      }
    };
    fetchStreamers();
    return () => {
      ignore = true;
    };
  }, [getNewStreamerScore]);
  // Increment Streamer Score
  const incrementStreamerScore = (progress: number) => {
    if (progress < 1) {
      setStreamers((prevState) => {
        return prevState.map((streamer) => {
          const newStreamer = { ...streamer };
          if (streamer.newScore && streamer.score !== streamer.newScore) {
            newStreamer.score = Math.ceil(streamer.newScore * (progress + 1));
          }
          return newStreamer;
        });
      });
    } else {
      console.log("!!!!11111111111111");
      setStreamers((prevState) => {
        return prevState.map((streamer) => {
          const newStreamer = { ...streamer };
          if (streamer.newScore && streamer.score !== streamer.newScore) {
            newStreamer.score = streamer.newScore;
          }
          setStreamers(getNewStreamerScore(prevState));
          return newStreamer;
        });
      });

      // setStreamers((prevState) => getNewStreamerScore(prevState));
    }
  };
  const getStreamerList = () => {
    return streamers.map((streamer: StreamerType, index: number) => {
      return (
        <StyledStreamer key={streamer.userID}>
          <div>{index + 1}</div>
          <StyledAvatar imgUrl={streamer.picture} />
          <div>{streamer.displayName}</div>
          <StyledScore>{`${streamer.score}pt`}</StyledScore>
        </StyledStreamer>
      );
    });
  };
  // Score update
  useAnimationFrame({
    nextAnimationFrameHandler: incrementStreamerScore,
    // shouldAnimate,
    shouldAnimate: true,
    duration: 1000,
  });
  return <StyledRankList>{getStreamerList()}</StyledRankList>;
}

const StyledRankList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-width: 320px;
  margin: auto;
`;
const StyledStreamer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  height: 48px;
  align-items: center;
  transition: "all 0.3s ease 0s";
`;
const StyledAvatar = styled.div<{ imgUrl: string }>(
  ({ imgUrl }) => `
  height: 36px;
  width: 36px;
  background-image: url(${imgUrl});
  background-size: 100%;
  border-radius: 18px;
  border: 2px solid rgb(255, 255, 255);
`
);
const StyledScore = styled.div`
  flex: 1;
  text-align: end;
`;
