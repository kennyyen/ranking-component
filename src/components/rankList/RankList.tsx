/**
 * RankList.tsx - the main application file
 */
import { createRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { useMoveRank } from "../../hooks/useMoveRank";

// Typing
type StreamerType = {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
  scoreIncrement: number;
};
type StreamerArrType = StreamerType[];
const STREAMER_DATA_URL = "https://webcdn.17app.co/campaign/pretest/data.json";
/**
 * RankList component
 * @returns {React.ReactElement}
 */
export default function RankList(): React.ReactElement {
  const [streamers, setStreamers] = useState<StreamerArrType>([]);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);
  let listReft = createRef<HTMLDivElement>();
  // useMoveRank(listReft);
  // Get new streamer score
  const getNewStreamerScore = useCallback((data: StreamerArrType) => {
    return data.map((streamer: StreamerType) => {
      // 1/5 chance to update
      if (Math.round(Math.random() * 100) % 5 === 0) {
        // increment within a range of 0 - 1000
        const increaseBy = Math.round(Math.random() * 1000);
        return { ...streamer, scoreIncrement: increaseBy };
      }
      return { ...streamer, scoreIncrement: 0 };
    });
  }, []);
  useEffect(() => {
    let ignore = false;
    const fetchStreamers = async () => {
      const result = await fetch(STREAMER_DATA_URL);
      const data = await result.json();
      if (!ignore) {
        setStreamers(
          getNewStreamerScore(data).sort((a, b) => b.score - a.score)
        );
        setShouldAnimate(true);
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
      setStreamers((prevState) =>
        prevState.map((streamer) => {
          return {
            ...streamer,
            score:
              streamer.score + Math.ceil(streamer.scoreIncrement * progress),
          };
        })
      );
    } else {
      setStreamers((prevState) => getNewStreamerScore(prevState));
    }
  };
  const getStreamerList = () => {
    return streamers
      .sort((a, b) => b.score - a.score)
      .map((streamer: StreamerType, index: number) => {
        return (
          <StyledStreamer
            key={streamer.userID}
            style={{ top: `${54 * index}px` }}
          >
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
    shouldAnimate,
    duration: 1000,
  });
  return <StyledRankList ref={listReft}>{getStreamerList()}</StyledRankList>;
}

const StyledRankList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 320px;
  margin: auto;
  padding: 1rem;
`;
const StyledStreamer = styled.div`
  position: absolute;
  transition: all 1s ease 0s;
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  height: 48px;
  align-items: center;
  width: 100%;
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
