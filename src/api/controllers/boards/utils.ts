function buildBoardDto(boards: string[], mediaPattern: RegExp) {
  return boards.reduce((acc: string[], cur) => {
    const match = cur.match(mediaPattern);
    if (match) acc.push(match[0]);
    return acc;
  }, []);
}

export default buildBoardDto;
