const boards = [
  {
    id: "kt-drifter-105",
    brand: "KT",
    name: "KT Drifter",
    image: "assets/boards/kt-drifter-105.png",
    volume: "105 L",
    length: "5'6\" (167 cm)",
    width: "28\" (71.1 cm)",
    weight: "7.4 kg",
    price: null,
  },
  {
    id: "kt-drifter-4-90",
    brand: "KT",
    name: "KT Drifter 4",
    image: "assets/boards/kt-drifter-4-90.png",
    volume: "90 L",
    length: "5'10\" (177.8 cm)",
    width: "26.25\" (66.7 cm)",
    weight: "6.0 kg",
    price: "€ 1.439,00",
  },
  {
    id: "skybrid-sls-2026-100",
    brand: "Duotone",
    name: "SKYBRID SLS 2026",
    image: "assets/boards/skybrid-sls-2026-100.png",
    volume: "100 L",
    length: "6'1\" (180 cm)",
    width: "22\" (54.61 cm)",
    weight: "6.47 kg",
    price: "€ 1949",
  },
  {
    id: "appleslice-v4-100",
    brand: "Apple Tree",
    name: "AppleSlice V4",
    image: "https://appletreesurfboards.com/wp-content/uploads/Appleslice-V4-Deck-600x600.png",
    volume: "100 L",
    length: "5'9\" (175 cm)",
    width: "25\" (63.5 cm)",
    weight: null,
    price: "€ 1.999,00",
  },
  {
    id: "midlength-v2-97",
    brand: "Apple Tree",
    name: "Midlength V2",
    image: "https://appletreesurfboards.com/wp-content/uploads/Midlenght-V2-deck-4-scaled.png",
    volume: "97 L",
    length: "6'9\" (206 cm)",
    width: "19.8\" (50.3 cm)",
    weight: null,
    price: "€ 1.999,00",
  },
  {
    id: "flygroove-95",
    brand: "Flygroove",
    name: "Flygroove",
    image: "assets/boards/flygroove-95.png",
    volume: "95 L",
    length: "6'0\" (184 cm)",
    width: "21.6\" (55 cm)",
    weight: null,
    price: "€ 1820",
  },
  {
    id: "kt-super-k-v2-95",
    brand: "KT",
    name: "KT Super K V2",
    image: "assets/boards/kt-super-k-v2-95.png",
    volume: "95 L",
    length: "6'3\" (190 cm)",
    width: "20.7\" (52 cm)",
    weight: "5.7 kg",
    price: "€ 1995",
  },
  {
    id: "takoon-glide-105",
    brand: "Takoon",
    name: "Takoon Glide",
    image: "assets/boards/takoon-glide-105.png",
    volume: "105 L",
    length: "6'6\" (198 cm)",
    width: "23.5\" (59.7 cm)",
    weight: "6.2 kg",
    price: "€1,199.00 (met tas)",
  },
  {
    id: "kt-drifter-5-pro-carbon-90",
    brand: "KT",
    name: "KT Drifter 5 Pro Carbon",
    image: "assets/boards/kt-drifter-5-pro-carbon-90.jpg",
    volume: "90 L",
    length: "5'11\" (180.3 cm)",
    width: "25\" (63.5 cm)",
    weight: "5.6 kg",
    price: "€ 2.205,00",
  },
  {
    id: "kt-arc-pro-carbon-98",
    brand: "KT",
    name: "KT Arc Pro Carbon",
    image: "assets/boards/kt-arc-pro-carbon-98.jpg",
    volume: "98 L",
    length: "6'4\" (193 cm)",
    width: "21.8\" (55.4 cm)",
    weight: "5.4 kg",
    price: "€ 2.330,00",
  },
  {
    id: "afs-blackbird-mid-length-100",
    brand: "AFS",
    name: "AFS Blackbird Mid Length",
    image: "assets/boards/afs-blackbird-mid-length-100.png",
    volume: "100 L",
    length: "6'3\" (190 cm)",
    width: "22.5\" (57 cm)",
    weight: "6.6 kg",
    price: "€ 1.511,50",
  },
  {
    id: "f-one-rocket-midlength-carbon-105",
    brand: "F-One",
    name: "F-One Rocket Midlength Carbon",
    image: "assets/boards/f-one-rocket-midlength-carbon-105.png",
    volume: "105 L",
    length: "6'4\" (193 cm)",
    width: "21\" (53.8 cm)",
    weight: "5.6 kg",
    price: "€ 1.749,00",
  },
];

const specs = [
  { key: "length", label: "Length" },
  { key: "width", label: "Width" },
  { key: "weight", label: "Weight" },
  { key: "price", label: "Price" },
  { key: "volume", label: "Volume" },
];

const originalOrder = new Map(boards.map((board, index) => [board.id, index]));
const storageKey = "wingfoil-compare-visible-boards";
const selectionMigrationStorageKey = "wingfoil-compare-selection-migration";
const selectionIdReplacements = new Map([
  ["kt-drifter-4-100", "kt-drifter-4-90"],
  ["kt-drifter-5-pro-carbon-100", "kt-drifter-5-pro-carbon-90"],
  ["f-one-rocket-midlength-carbon-95", "f-one-rocket-midlength-carbon-105"],
  ["skipper-midlength-97", "midlength-v2-97"],
]);
const selectionIdRemovals = new Set(["f-one-midlenth-105"]);
const selectionMigrationKey = "f-one-non-carbon-midlength-removal";
const newlyAddedBoardIds = [];
const sortStorageKey = "wingfoil-compare-sort";
const sortMigrationStorageKey = "wingfoil-compare-sort-migration";
const sortMigrationKey = "default-brand-order";
const preferredBrandOrder = ["KT"];
const preferredBrandBoardOrder = [
  "kt-drifter-105",
  "kt-drifter-4-90",
  "kt-drifter-5-pro-carbon-90",
];
const picker = document.querySelector("[data-board-picker]");
const boardFilterSummary = document.querySelector("[data-board-filter-summary]");
const table = document.querySelector("[data-compare-table]");
const selectAllButton = document.querySelector("[data-action='select-all']");
const sortKeySelect = document.querySelector("[data-sort-key]");
const sortDirectionSelect = document.querySelector("[data-sort-direction]");

let selectedIds = loadSelection();
let sortState = loadSortState();

function loadSelection() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey));
    if (Array.isArray(stored)) {
      const normalizedStored = stored
        .map((id) => selectionIdReplacements.get(id) ?? id)
        .filter((id) => !selectionIdRemovals.has(id));
      if (!normalizedStored.every((id) => boards.some((board) => board.id === id))) {
        const allBoardIds = boards.map((board) => board.id);
        localStorage.setItem(selectionMigrationStorageKey, selectionMigrationKey);
        localStorage.setItem(storageKey, JSON.stringify(allBoardIds));
        return new Set(allBoardIds);
      }

      const selected = new Set(normalizedStored);
      if (localStorage.getItem(selectionMigrationStorageKey) !== selectionMigrationKey) {
        newlyAddedBoardIds.forEach((id) => selected.add(id));
        localStorage.setItem(selectionMigrationStorageKey, selectionMigrationKey);
      }

      localStorage.setItem(storageKey, JSON.stringify([...selected]));
      return selected;
    }
  } catch {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(selectionMigrationStorageKey);
  }

  localStorage.setItem(selectionMigrationStorageKey, selectionMigrationKey);
  return new Set(boards.map((board) => board.id));
}

function saveSelection() {
  localStorage.setItem(storageKey, JSON.stringify([...selectedIds]));
}

function loadSortState() {
  const fallback = { key: "brand", direction: "asc" };
  try {
    const stored = JSON.parse(localStorage.getItem(sortStorageKey));
    const allowedKeys = ["brand", "original", "length", "width", "weight", "volume", "price"];
    const allowedDirections = ["asc", "desc"];
    if (
      stored &&
      allowedKeys.includes(stored.key) &&
      allowedDirections.includes(stored.direction)
    ) {
      if (
        stored.key === "original" &&
        localStorage.getItem(sortMigrationStorageKey) !== sortMigrationKey
      ) {
        localStorage.setItem(sortMigrationStorageKey, sortMigrationKey);
        localStorage.setItem(sortStorageKey, JSON.stringify(fallback));
        return fallback;
      }

      localStorage.setItem(sortMigrationStorageKey, sortMigrationKey);
      return stored;
    }
  } catch {
    localStorage.removeItem(sortStorageKey);
    localStorage.removeItem(sortMigrationStorageKey);
  }

  localStorage.setItem(sortMigrationStorageKey, sortMigrationKey);
  return fallback;
}

function saveSortState() {
  localStorage.setItem(sortStorageKey, JSON.stringify(sortState));
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function parseFirstNumber(value) {
  if (!value) {
    return null;
  }

  const match = value.match(/\d+(?:[.,]\d+)?/);
  return match ? Number(match[0].replace(",", ".")) : null;
}

function parseLength(value) {
  if (!value) {
    return null;
  }

  const cmMatch = value.match(/\(([\d.,]+)\s*cm\)/i);
  if (cmMatch) {
    return Number(cmMatch[1].replace(",", "."));
  }

  const feetMatch = value.match(/(\d+)[’']\s*(\d+)?/);
  if (!feetMatch) {
    return parseFirstNumber(value);
  }

  const feet = Number(feetMatch[1]);
  const inches = feetMatch[2] ? Number(feetMatch[2]) : 0;
  return (feet * 12 + inches) * 2.54;
}

function parsePrice(value) {
  if (!value) {
    return null;
  }

  const compact = value.replace(/[^\d.,]/g, "");
  if (!compact) {
    return null;
  }

  const lastComma = compact.lastIndexOf(",");
  const lastDot = compact.lastIndexOf(".");

  if (lastComma > -1 && lastDot > -1) {
    const decimalSeparator = lastComma > lastDot ? "," : ".";
    const thousandsSeparator = decimalSeparator === "," ? "." : ",";
    return Number(
      compact.replaceAll(thousandsSeparator, "").replace(decimalSeparator, ".")
    );
  }

  if (lastComma > -1) {
    const [, decimalPart = ""] = compact.split(",");
    return Number(
      decimalPart.length === 3
        ? compact.replaceAll(",", "")
        : compact.replace(",", ".")
    );
  }

  if (lastDot > -1) {
    const [, decimalPart = ""] = compact.split(".");
    return Number(
      decimalPart.length === 3
        ? compact.replaceAll(".", "")
        : compact
    );
  }

  return Number(compact);
}

function getBrandRank(brand) {
  const preferredIndex = preferredBrandOrder.indexOf(brand);
  return preferredIndex === -1 ? preferredBrandOrder.length : preferredIndex;
}

function compareBrand(a, b) {
  const rankDiff = getBrandRank(a.brand) - getBrandRank(b.brand);
  if (rankDiff !== 0) {
    return rankDiff;
  }

  const brandDiff = a.brand.localeCompare(b.brand, undefined, { sensitivity: "base" });
  if (brandDiff !== 0) {
    return brandDiff;
  }

  const aBoardIndex = preferredBrandBoardOrder.indexOf(a.id);
  const bBoardIndex = preferredBrandBoardOrder.indexOf(b.id);
  if (aBoardIndex !== -1 || bBoardIndex !== -1) {
    if (aBoardIndex === -1) {
      return 1;
    }
    if (bBoardIndex === -1) {
      return -1;
    }
    return aBoardIndex - bBoardIndex;
  }

  return originalOrder.get(a.id) - originalOrder.get(b.id);
}

function sortBoardsByBrand(boardList) {
  return [...boardList].sort(compareBrand);
}

function getSortValue(board) {
  switch (sortState.key) {
    case "length":
      return parseLength(board.length);
    case "width":
      return parseFirstNumber(board.width);
    case "weight":
      return parseFirstNumber(board.weight);
    case "volume":
      return parseFirstNumber(board.volume);
    case "price":
      return parsePrice(board.price);
    default:
      return originalOrder.get(board.id);
  }
}

function sortBoards(boardList) {
  if (sortState.key === "original") {
    return boardList;
  }

  return [...boardList].sort((a, b) => {
    if (sortState.key === "brand") {
      const brandDiff = compareBrand(a, b);
      return sortState.direction === "asc" ? brandDiff : -brandDiff;
    }

    const aValue = getSortValue(a);
    const bValue = getSortValue(b);
    const aMissing = aValue === null || Number.isNaN(aValue);
    const bMissing = bValue === null || Number.isNaN(bValue);

    if (aMissing && bMissing) {
      return originalOrder.get(a.id) - originalOrder.get(b.id);
    }
    if (aMissing) {
      return 1;
    }
    if (bMissing) {
      return -1;
    }

    const valueDiff = aValue - bValue;
    if (valueDiff === 0) {
      return originalOrder.get(a.id) - originalOrder.get(b.id);
    }

    return sortState.direction === "asc" ? valueDiff : -valueDiff;
  });
}

function renderBoardFilterSummary() {
  const selectedCount = boards.filter((board) => selectedIds.has(board.id)).length;

  if (selectedCount === boards.length) {
    boardFilterSummary.textContent = "All boards selected";
    return;
  }

  if (selectedCount === 0) {
    boardFilterSummary.textContent = "No boards selected";
    return;
  }

  boardFilterSummary.textContent = `${selectedCount} of ${boards.length} boards selected`;
}

function renderPicker() {
  picker.replaceChildren();

  sortBoardsByBrand(boards).forEach((board) => {
    const label = createElement("label", "board-toggle");
    const input = document.createElement("input");
    const name = createElement("span", null, board.name);

    input.type = "checkbox";
    input.checked = selectedIds.has(board.id);
    input.addEventListener("change", () => {
      if (input.checked) {
        selectedIds.add(board.id);
      } else {
        selectedIds.delete(board.id);
      }
      saveSelection();
      renderBoardFilterSummary();
      renderTable();
    });

    label.append(input, name);
    picker.append(label);
  });

  renderBoardFilterSummary();
}

function renderSortControls() {
  sortKeySelect.value = sortState.key;
  sortDirectionSelect.value = sortState.direction;
}

function renderTable() {
  const visibleBoards = sortBoards(boards.filter((board) => selectedIds.has(board.id)));
  const boardColumnWidth = 190;
  const specColumnWidth = window.matchMedia("(max-width: 760px)").matches ? 130 : 170;
  table.style.minWidth = `${specColumnWidth + visibleBoards.length * boardColumnWidth}px`;
  table.replaceChildren();

  const colgroup = document.createElement("colgroup");
  const specCol = document.createElement("col");
  specCol.style.width = `${specColumnWidth}px`;
  colgroup.append(specCol);
  visibleBoards.forEach(() => {
    const boardCol = document.createElement("col");
    boardCol.style.width = `${boardColumnWidth}px`;
    colgroup.append(boardCol);
  });

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  headRow.append(createElement("th", "spec-head", "Spec"));

  visibleBoards.forEach((board) => {
    const header = document.createElement("th");
    header.scope = "col";

    const card = createElement("div", "board-card");
    const image = createElement("img", "board-image");
    const name = createElement("span", "board-name", board.name);

    image.src = board.image;
    image.alt = "";
    image.loading = "eager";

    card.append(image, name);
    header.append(card);
    headRow.append(header);
  });

  thead.append(headRow);

  const tbody = document.createElement("tbody");
  if (visibleBoards.length === 0) {
    const row = document.createElement("tr");
    row.append(createElement("th", null, "Boards"));

    const empty = createElement("td", "empty-cell", "No boards selected.");
    empty.colSpan = 1;
    row.append(empty);
    tbody.append(row);
  } else {
    specs.forEach((spec) => {
      const row = document.createElement("tr");
      const rowHeader = createElement("th", null, spec.label);
      rowHeader.scope = "row";
      row.append(rowHeader);

      visibleBoards.forEach((board) => {
        row.append(createElement("td", null, board[spec.key] || "-"));
      });

      tbody.append(row);
    });
  }

  table.append(colgroup, thead, tbody);
}

function render() {
  renderPicker();
  renderSortControls();
  renderTable();
}

selectAllButton.addEventListener("click", () => {
  selectedIds = new Set(boards.map((board) => board.id));
  saveSelection();
  render();
});

sortKeySelect.addEventListener("change", () => {
  sortState = { ...sortState, key: sortKeySelect.value };
  saveSortState();
  renderTable();
});

sortDirectionSelect.addEventListener("change", () => {
  sortState = { ...sortState, direction: sortDirectionSelect.value };
  saveSortState();
  renderTable();
});

window.addEventListener("resize", renderTable);

render();
