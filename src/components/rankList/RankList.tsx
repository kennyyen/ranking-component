/**
 * Map.tsx - the main application file
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

// Typing
type StreamerType = {
  userID: string;
  displayName: string;
  picture: string;
  score: string;
};

/**
 * RankList component
 * @returns {React.ReactElement}
 */
export default function RankList(): React.ReactElement {
  const [streamers, setStreamers] = useState([]);
  useEffect(() => {
    let ignore = false;
    const fetchStreamers = async () => {
      const result = await fetch(
        "https://webcdn.17app.co/campaign/pretest/data.json"
      );
      const data = await result.json();
      if (!ignore) {
        console.log("result: ", data);
        setStreamers(data);
      }
    };
    fetchStreamers();
    return () => {
      ignore = true;
    };
  }, []);
  // Score update
  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  });
  return (
    <StyledRankList>
      {streamers.map((streamer: StreamerType, index: number) => {
        return (
          <StyledStreamer key={streamer.userID}>
            <div>{index + 1}</div>
            <StyledAvatar imgUrl={streamer.picture} />
            <div>{streamer.displayName}</div>
            <StyledScore>{`${streamer.score}pt`}</StyledScore>
          </StyledStreamer>
        );
      })}
    </StyledRankList>
  );
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
