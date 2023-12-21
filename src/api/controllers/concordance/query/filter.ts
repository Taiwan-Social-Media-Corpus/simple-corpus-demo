function buildFilterString(
  media: string | null,
  board: string[] | null,
  start: string,
  end: string,
) {
  let boardFilter = '';
  let mediaFilter = '';

  if (board) {
    const boardValues = board.map((value) => `${value}-${media}`);
    boardFilter = `board:(${boardValues.join(' + ')}) AND `;
  }

  if (media) {
    mediaFilter = `media:(${media}) AND `;
  }

  const yearFilter = `year:[${start} TO ${end}]`;
  return `${boardFilter}${mediaFilter}${yearFilter}`;
}

export default buildFilterString;
