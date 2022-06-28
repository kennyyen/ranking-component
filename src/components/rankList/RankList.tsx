/**
 * RankList.tsx - the main application file
 */
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

// Typing
type StreamerType = {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
  scoreIncrement: number;
};
type StreamerArrType = StreamerType[];
// Constants
const STREAMER_DATA_URL = "https://webcdn.17app.co/campaign/pretest/data.json";
/**
 * RankList component
 * @returns {React.ReactElement}
 */
export default function RankList(): React.ReactElement {
  const [streamers, setStreamers] = useState<StreamerArrType>([]);
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false);

  /**
   * Get new streamer score
   */
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
  // initial data fetch to get streamer info from server
  useEffect(() => {
    let ignore = false;
    const fetchStreamers = async () => {
      const result = await fetch(STREAMER_DATA_URL);
      const data = await result.json();
      if (!ignore) {
        setStreamers(getNewStreamerScore(data));
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
  // Score updates with requestAnimationFrame
  useAnimationFrame({
    nextAnimationFrameHandler: incrementStreamerScore,
    shouldAnimate,
    duration: 1000,
  });
  // calculate new rankings
  const sortedStreamers = [...streamers].sort((a, b) => b.score - a.score);
  const newOrder = streamers.map((streamer) => {
    // find new position in the sorted array
    return sortedStreamers.findIndex((ele) => {
      return streamer.userID === ele.userID;
    });
  });

  /**
   * List out all entries so React does not recreate them
   * and break the transition animation
   */
  return streamers?.length > 0 ? (
    <StyledRankList>
      <StyledStreamer
        key={streamers[0].userID}
        style={{ top: `${54 * newOrder[0]}px` }}
      >
        <div>{newOrder[0] + 1}</div>
        <StyledAvatar imgUrl={streamers[0].picture} />
        <div>{streamers[0].displayName}</div>
        <StyledScore>{`${streamers[0].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[1].userID}
        style={{ top: `${54 * newOrder[1]}px` }}
      >
        <div>{newOrder[1] + 1}</div>
        <StyledAvatar imgUrl={streamers[1].picture} />
        <div>{streamers[1].displayName}</div>
        <StyledScore>{`${streamers[1].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[2].userID}
        style={{ top: `${54 * newOrder[2]}px` }}
      >
        <div>{newOrder[2] + 1}</div>
        <StyledAvatar imgUrl={streamers[2].picture} />
        <div>{streamers[2].displayName}</div>
        <StyledScore>{`${streamers[2].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[3].userID}
        style={{ top: `${54 * newOrder[3]}px` }}
      >
        <div>{newOrder[3] + 1}</div>
        <StyledAvatar imgUrl={streamers[3].picture} />
        <div>{streamers[3].displayName}</div>
        <StyledScore>{`${streamers[3].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[4].userID}
        style={{ top: `${54 * newOrder[4]}px` }}
      >
        <div>{newOrder[4] + 1}</div>
        <StyledAvatar imgUrl={streamers[4].picture} />
        <div>{streamers[4].displayName}</div>
        <StyledScore>{`${streamers[4].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[5].userID}
        style={{ top: `${54 * newOrder[5]}px` }}
      >
        <div>{newOrder[5] + 1}</div>
        <StyledAvatar imgUrl={streamers[5].picture} />
        <div>{streamers[5].displayName}</div>
        <StyledScore>{`${streamers[5].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[6].userID}
        style={{ top: `${54 * newOrder[6]}px` }}
      >
        <div>{newOrder[6] + 1}</div>
        <StyledAvatar imgUrl={streamers[6].picture} />
        <div>{streamers[6].displayName}</div>
        <StyledScore>{`${streamers[6].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[7].userID}
        style={{ top: `${54 * newOrder[7]}px` }}
      >
        <div>{newOrder[7] + 1}</div>
        <StyledAvatar imgUrl={streamers[7].picture} />
        <div>{streamers[7].displayName}</div>
        <StyledScore>{`${streamers[7].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[8].userID}
        style={{ top: `${54 * newOrder[8]}px` }}
      >
        <div>{newOrder[8] + 1}</div>
        <StyledAvatar imgUrl={streamers[8].picture} />
        <div>{streamers[8].displayName}</div>
        <StyledScore>{`${streamers[8].score}pt`}</StyledScore>
      </StyledStreamer>
      <StyledStreamer
        key={streamers[9].userID}
        style={{ top: `${54 * newOrder[9]}px` }}
      >
        <div>{newOrder[9] + 1}</div>
        <StyledAvatar imgUrl={streamers[9].picture} />
        <div>{streamers[9].displayName}</div>
        <StyledScore>{`${streamers[9].score}pt`}</StyledScore>
      </StyledStreamer>
    </StyledRankList>
  ) : (
    <></>
  );
}

const StyledRankList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 320px;
  margin: 50px auto;
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
