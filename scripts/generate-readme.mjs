// 풀이 파일(.md)을 훑어서 README.md의 자동 생성 영역을 갱신한다.
// 사용법: node scripts/generate-readme.mjs
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const README = path.join(ROOT, "README.md");
const START = "<!-- AUTO-GENERATED:START -->";
const END = "<!-- AUTO-GENERATED:END -->";

const IGNORE_DIRS = new Set([".git", ".github", "0_image", "scripts", "node_modules"]);
const HOLD_DIR = "z_HOLD";

// 분류 기준. [폴더, 이름, 이럴 때 여기]
const CATEGORIES = [
  ["data_structure", "자료구조", "스택·큐·덱·힙·해시맵·셋 같은 자료구조의 성질이 풀이의 핵심"],
  ["tree", "트리", "부모-자식 관계, 트리 순회, 서브트리, LCA처럼 트리 구조를 다룸"],
  ["math", "수학", "소수·약수·GCD, 경우의 수, 식을 세워 푸는 문제"],
  ["greedy", "그리디", "정렬한 뒤 매번 가장 좋은 것을 고르면 답이 됨"],
  ["dynamic_programming", "DP", "작은 문제의 답을 저장해서 큰 문제를 풂 (메모이제이션 DFS 포함)"],
  ["two_pointer", "투 포인터", "두 인덱스를 움직이며 구간이나 쌍을 찾음 (슬라이딩 윈도우 포함)"],
  ["implementation", "구현", "문제 조건을 그대로 코드로 옮김 (파싱, 조건 분기, 날짜 계산)"],
  ["graph_traversal", "그래프 탐색", "BFS/DFS로 정점·격자·상태를 탐색 (가중치 없는 최단 거리 포함)"],
  ["brute_force", "완전탐색", "가능한 경우를 반복문이나 분할로 전부 직접 확인"],
  ["simulation", "시뮬레이션", "규칙에 따라 시간이나 턴을 진행시키며 상태 변화를 따라감"],
  ["binary_search", "이분탐색", "범위나 답(파라메트릭 서치)을 절반씩 줄여서 찾음"],
  ["backtracking", "백트래킹", "재귀로 하나씩 고르고 되돌리며 순열·조합·부분집합을 만듦"],
  ["divide_and_conquer", "분할정복", "문제를 쪼개 재귀로 풀고 합침 (거듭제곱, 쿼드트리)"],
  ["prefix_sum", "누적합", "미리 계산한 누적합으로 구간 합을 빠르게 구함 (2차원 포함)"],
  ["string", "문자열", "문자열을 다루는 것 자체가 핵심 (팰린드롬, 패턴 찾기 등)"],
  ["shortest_path", "최단거리", "가중치가 있는 최단 거리 (다익스트라, 플로이드, 벨만-포드, 0-1 BFS)"],
  ["topological_sorting", "위상정렬", "먼저 해야 하는 일이 정해진 작업들의 순서"],
  ["disjoint_set", "분리집합", "Union-Find로 집합을 합치거나 같은 집합인지 판정"],
  ["minimum_spanning_tree", "최소 스패닝 트리", "모든 정점을 최소 비용으로 연결 (크루스칼, 프림)"],
  ["trie", "트라이", "문자열 접두사 트리"],
];
const CATEGORY_NAMES = Object.fromEntries(CATEGORIES.map(([dir, name]) => [dir, name]));

const SITES = {
  BOJ: { name: "백준", url: "https://www.acmicpc.net" },
  PG: { name: "프로그래머스", url: "https://school.programmers.co.kr" },
  CT: { name: "코드트리", url: "https://www.codetree.ai" },
};

const TIER_ORDER = { B: 0, S: 1, G: 2, P: 3, D: 4, R: 5 };
const TIER_NAMES = { B: "Bronze", S: "Silver", G: "Gold", P: "Platinum", D: "Diamond", R: "Ruby" };

function parseLevel(site, level) {
  if (site === "PG") {
    if (level === "PCCP") return { label: "PCCP", rank: 0, group: "PCCP" };
    const n = Number(level.replace("LV", ""));
    return { label: `Lv. ${n}`, rank: n, group: `Lv. ${n}` };
  }
  const tier = level[0];
  const n = Number(level.slice(1));
  if (tier in TIER_ORDER && n) {
    // 같은 티어 안에서는 숫자가 작을수록 어렵다
    return { label: `${TIER_NAMES[tier]} ${n}`, rank: TIER_ORDER[tier] * 10 + (6 - n), group: TIER_NAMES[tier] };
  }
  return { label: level, rank: -1, group: level };
}

function encodePath(p) {
  return p.split("/").map(encodeURIComponent).join("/");
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".md") && dir !== ROOT) out.push(full);
  }
  return out;
}

// 파일이 처음 추가된 날짜. 이름 변경/폴더 이동은 따라간다. (git 히스토리가 없으면 빈 값)
function addedDates() {
  const dates = new Map();
  try {
    const log = execSync("git -c core.quotepath=false log --reverse -M --name-status --format=@@%ad --date=short", {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
    let current = "";
    for (const line of log.split("\n")) {
      if (line.startsWith("@@")) {
        current = line.slice(2);
        continue;
      }
      const [status, from, to] = line.split("\t");
      if (!status) continue;
      if (status === "A" && !dates.has(from)) dates.set(from, current);
      else if (status.startsWith("R")) {
        dates.set(to, dates.get(from) ?? current);
        dates.delete(from);
      }
    }
  } catch {
    // git이 없는 환경에서는 날짜 없이 진행
  }
  return dates;
}

function parseSolution(file, dates) {
  const rel = path.relative(ROOT, file).split(path.sep).join("/");
  const [category] = rel.split("/");
  const base = path.basename(file, ".md");
  const content = fs.readFileSync(file, "utf8");

  const match = base.match(/^([A-Z]+)_([A-Z]+\d*|PCCP)_(.+)$/);
  if (!match || !SITES[match[1]]) return { kind: "other", rel, category, title: base.replace(/^EX_/, "") };

  const [, site, levelRaw, title] = match;
  const url = (content.match(/https?:\/\/\S+/) || [])[0] ?? null;
  const headings = [...content.matchAll(/^#\s+(Pass|Fail|Solution|Example)\s+\d+/gm)];
  const count = (type) => headings.filter((h) => h[1] === type).length;

  return {
    kind: "solution",
    rel,
    category,
    site,
    title,
    level: parseLevel(site, levelRaw),
    url,
    pass: count("Pass") + count("Solution"),
    fail: count("Fail"),
    date: dates.get(rel) ?? "",
  };
}

function record(s) {
  const parts = [];
  if (s.fail) parts.push(`❌ ${s.fail}`);
  if (s.pass) parts.push(`✅ ${s.pass}`);
  return parts.join(" → ") || "-";
}

function problemCell(s) {
  return s.url ? `[${s.title}](${s.url})` : s.title;
}

function row(s, withCategory = false) {
  const cells = [problemCell(s), SITES[s.site].name, s.level.label];
  if (withCategory) cells.push(CATEGORY_NAMES[s.category] ?? s.category);
  cells.push(`[풀이](${encodePath(s.rel)})`, record(s), s.date || "-");
  return `| ${cells.join(" | ")} |`;
}

function header(withCategory = false) {
  const cols = ["문제", "사이트", "난이도"];
  if (withCategory) cols.push("유형");
  cols.push("풀이", "기록", "날짜");
  return [`| ${cols.join(" | ")} |`, `| ${cols.map(() => "---").join(" | ")} |`].join("\n");
}

function sortByLevel(a, b) {
  return a.site.localeCompare(b.site) || b.level.rank - a.level.rank || a.title.localeCompare(b.title, "ko");
}

function build() {
  const dates = addedDates();
  const all = walk(ROOT).map((f) => parseSolution(f, dates));
  const solutions = all.filter((s) => s.kind === "solution" && s.category !== HOLD_DIR);
  const hold = all.filter((s) => s.kind === "solution" && s.category === HOLD_DIR);
  const others = all.filter((s) => s.kind === "other");

  const lines = [];
  const push = (...l) => lines.push(...l);

  // 요약
  push("## 📊 요약", "");
  push(`총 **${solutions.length}** 문제를 풀었습니다.`, "");
  push("| 사이트 | 문제 수 | 난이도 분포 |", "| --- | --- | --- |");
  for (const [key, site] of Object.entries(SITES)) {
    const list = solutions.filter((s) => s.site === key);
    if (!list.length) continue;
    const groups = new Map();
    for (const s of [...list].sort((a, b) => b.level.rank - a.level.rank)) {
      groups.set(s.level.group, (groups.get(s.level.group) ?? 0) + 1);
    }
    const dist = [...groups].map(([g, n]) => `${g} ${n}`).join(" · ");
    push(`| [${site.name}](${site.url}) | ${list.length} | ${dist} |`);
  }
  push("");

  // 유형별 개수 (분류 기준 순서, 기준에 없는 폴더는 뒤에)
  const present = new Set(solutions.map((s) => s.category));
  const categories = [
    ...CATEGORIES.map(([dir]) => dir).filter((dir) => present.has(dir)),
    ...[...present].filter((dir) => !(dir in CATEGORY_NAMES)).sort(),
  ];
  push("## 🗂️ 유형별 문제 수", "");
  push("> 헷갈릴 때는 위의 [분류 기준](#분류-기준)을 따릅니다.", "");
  push("| # | 유형 | 이럴 때 여기 | 문제 수 |", "| --- | --- | --- | --- |");
  CATEGORIES.forEach(([dir, name, desc], i) => {
    const n = solutions.filter((s) => s.category === dir).length;
    const label = n ? `[${name}](${encodePath(dir)})` : name; // 빈 폴더는 GitHub에 없으므로 링크하지 않음
    push(`| ${String(i).padStart(2, "0")} | ${label} | ${desc} | ${n} |`);
  });
  for (const dir of categories.filter((dir) => !(dir in CATEGORY_NAMES))) {
    const n = solutions.filter((s) => s.category === dir).length;
    push(`| - | [${dir}](${encodePath(dir)}) | ⚠️ 분류 기준에 없는 폴더 | ${n} |`);
  }
  push("");

  // 최근 푼 문제
  const recent = solutions.filter((s) => s.date).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "ko")).slice(0, 10);
  if (recent.length) {
    push("## 🕒 최근 푼 문제", "", header(true));
    for (const s of recent) push(row(s, true));
    push("");
  }

  // 유형별 전체 목록
  push("## 📚 전체 문제", "");
  for (const c of categories) {
    const list = solutions.filter((s) => s.category === c).sort(sortByLevel);
    push(`<details>`, `<summary><b>${CATEGORY_NAMES[c] ?? c}</b> (${list.length})</summary>`, "", header());
    for (const s of list) push(row(s));
    push("", "</details>", "");
  }

  if (hold.length) {
    push("## ⏸️ 보류 중", "", header());
    for (const s of hold.sort(sortByLevel)) push(row(s));
    push("");
  }

  if (others.length) {
    push("## 🧩 직접 구현해 본 것", "");
    for (const o of others) push(`- [${o.title}](${encodePath(o.rel)}) (${CATEGORY_NAMES[o.category] ?? o.category})`);
    push("");
  }

  return lines.join("\n").trimEnd();
}

function main() {
  const generated = `${START}\n<!-- 이 영역은 scripts/generate-readme.mjs가 자동으로 생성합니다. 직접 수정하지 마세요. -->\n\n${build()}\n\n${END}`;
  let readme = fs.existsSync(README) ? fs.readFileSync(README, "utf8") : "# algorithm\n";
  if (readme.includes(START) && readme.includes(END)) {
    readme = readme.slice(0, readme.indexOf(START)) + generated + readme.slice(readme.indexOf(END) + END.length);
  } else {
    readme = `${readme.trimEnd()}\n\n${generated}\n`;
  }
  fs.writeFileSync(README, readme);
  console.log("README.md updated");
}

main();
