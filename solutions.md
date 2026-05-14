# JavaScript Solutions

---

## 1. Rotate Image (90 Degrees Clockwise)

**Problem:**
Given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place. Do NOT allocate another 2D matrix.

**Visual Example 1:**
```
Input:          After Transpose:   After Row Reverse (Output):
┌─────────┐     ┌─────────┐        ┌─────────┐
│ 1  2  3 │     │ 1  4  7 │        │ 7  4  1 │
│ 4  5  6 │  →  │ 2  5  8 │   →    │ 8  5  2 │
│ 7  8  9 │     │ 3  6  9 │        │ 9  6  3 │
└─────────┘     └─────────┘        └─────────┘
```

**Visual Example 2:**
```
Input:               Output:
┌──────────────┐     ┌──────────────┐
│  5   1   9  11│     │ 15  13   2   5│
│  2   4   8  10│  →  │ 14   3   4   1│
│ 13   3   6   7│     │ 12   6   8   9│
│ 15  14  12  16│     │ 16   7  10  11│
└──────────────┘     └──────────────┘
```

**Approach:** Transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse each row.

```javascript
function rotate(matrix) {
    const n = matrix.length;

    // Step 1: Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
```

**Complexity:** Time O(n²) | Space O(1)

---

## 2. Find Rotation (Match Matrix by Rotating)

**Problem:**
Given two n x n binary matrices `mat` and `target`, return `true` if it is possible to make `mat` equal to `target` by rotating `mat` in 90-degree increments, or `false` otherwise.

**Visual Example 1** — rotate 90° clockwise → matches target:
```
mat:        90° →      target:
┌─────┐               ┌─────┐
│ 0  1│               │ 1  0│
│ 1  0│    ────→      │ 0  1│
└─────┘               └─────┘
✓ match → true
```

**Visual Example 2** — no rotation matches:
```
mat:        0°    90°   180°  270°     target:
┌─────┐                               ┌─────┐
│ 0  1│  none of the 4 rotations  →   │ 1  0│
│ 1  1│  produce the target           │ 0  1│
└─────┘                               └─────┘
✗ no match → false
```

**Visual Example 3** — rotate 180° → matches target:
```
mat:           0°          90°         180° →      target:
┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐   ┌───────┐
│ 0  0  0│   no match  no match   │ 1  1  1│   │ 1  1  1│
│ 0  1  0│                        │ 0  1  0│ = │ 0  1  0│
│ 1  1  1│                        │ 0  0  0│   │ 0  0  0│
└───────┘                         └───────┘   └───────┘
                                  ✓ match → true
```

**Approach:** Rotate `mat` up to 3 times, checking equality with `target` after each rotation (including the original orientation).

```javascript
function findRotation(mat, target) {
    function rotate(matrix) {
        const n = matrix.length;
        // Transpose
        for (let i = 0; i < n; i++)
            for (let j = i + 1; j < n; j++)
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        // Reverse each row
        for (let i = 0; i < n; i++)
            matrix[i].reverse();
    }

    function isEqual(a, b) {
        return a.every((row, i) => row.every((val, j) => val === b[i][j]));
    }

    for (let i = 0; i < 4; i++) {   // 0°, 90°, 180°, 270°
        if (isEqual(mat, target)) return true;
        rotate(mat);
    }

    return false;
}
```

**Complexity:** Time O(n²) | Space O(1)

---

## 3. Toeplitz Matrix

**Problem:**
Given an m x n matrix, return `true` if the matrix is Toeplitz (every diagonal from top-left to bottom-right has the same elements), otherwise return `false`.

**Visual Example 1** — each diagonal has identical values:
```
┌──────────────┐
│ 1  2  3  4  │   diagonals: [9], [5,5], [1,1,1], [2,2,2], [3,3], [4]
│ 5  1  2  3  │   every diagonal is uniform → true
│ 9  5  1  2  │
└──────────────┘

Each cell matches its top-left neighbor:
(1,0)→5 checks 5==1? No wait...
cell[i][j] == cell[i-1][j-1] for all i,j ✓
```

**Visual Example 2** — diagonal `[1,2]` breaks the rule:
```
┌───────┐
│ 1  2  │   top-left diagonal: 1, 2  ← not equal → false
│ 2  2  │
└───────┘

cell[1][1]=2 vs cell[0][0]=1 → 2 ≠ 1 → false
```

**Visual — the check in action:**
```
┌──────────────┐
│ 1  2  3  4  │
│ 5 [1] 2  3  │   cell[1][1]=1, check cell[0][0]=1 ✓
│ 9  5 [1] 2  │   cell[2][2]=1, check cell[1][1]=1 ✓
└──────────────┘
     ↑
  each cell only needs to match its ↖ neighbor
```

**Approach:** Every cell `(i, j)` must equal its top-left neighbor `(i-1, j-1)`. Compare each cell to that neighbor.

```javascript
function isToeplitzMatrix(matrix) {
    const m = matrix.length, n = matrix[0].length;
    for (let i = 1; i < m; i++)
        for (let j = 1; j < n; j++)
            if (matrix[i][j] !== matrix[i-1][j-1])
                return false;
    return true;
}
```

**Complexity:** Time O(m × n) | Space O(1)

**Follow-up — Only one row fits in memory at a time:**
Load two rows at a time and compare `prev[j-1]` with `curr[j]`.

```javascript
function isToeplitzMatrixLimitedMemory(matrix) {
    let prev = matrix[0];
    for (let i = 1; i < matrix.length; i++) {
        const curr = matrix[i];
        for (let j = 1; j < curr.length; j++) {
            if (curr[j] !== prev[j - 1]) return false;
        }
        prev = curr;
    }
    return true;
}
```

---

## 4. Number of Enclaves

**Problem:**
Given an m x n binary matrix `grid` (0 = sea, 1 = land), return the number of land cells from which you cannot walk off the boundary of the grid in any number of moves (4-directional).

**Visual Example 1:**
```
Input:             After BFS from border:    Count remaining 1s:
┌───────────┐      ┌───────────┐             ┌───────────┐
│ 0  0  0  0│      │ 0  0  0  0│             │ 0  0  0  0│
│ 1  0  1  0│  →   │ 0  0  1  0│      →      │ 0  0  1  0│  → 3
│ 0  1  1  0│      │ 0  1  1  0│             │ 0  1  1  0│
│ 0  0  0  0│      │ 0  0  0  0│             │ 0  0  0  0│
└───────────┘      └───────────┘             └───────────┘
  border 1 at        border 1 zeroed           3 enclosed
  (1,0) removed      out by BFS                land cells
```

**Visual Example 2:**
```
Input:             After BFS from border:
┌───────────┐      ┌───────────┐
│ 0  1  1  0│      │ 0  0  0  0│
│ 0  0  1  0│  →   │ 0  0  0  0│  → 0
│ 0  0  1  0│      │ 0  0  0  0│
│ 0  0  0  0│      │ 0  0  0  0│
└───────────┘      └───────────┘
  all 1s connect    all land cells
  to border         reachable → 0
```

**Visual — BFS flood-fill direction:**
```
┌───────────┐
│ 0  0  0  0│  ← border cells seeded into queue
│ X  0  1  0│  X = border land, zeroed out first
│ 0  1  1  0│      then BFS spreads to connected land
│ 0  0  0  0│  ← border cells seeded into queue
└───────────┘
```

**Approach:** BFS from all border land cells, zeroing them out. Count remaining `1`s — those are the enclosed cells.

```javascript
function numEnclaves(grid) {
    const m = grid.length, n = grid[0].length;
    const queue = [];
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

    // Seed with border land cells
    for (let i = 0; i < m; i++)
        for (let j = 0; j < n; j++)
            if ((i === 0 || i === m-1 || j === 0 || j === n-1) && grid[i][j] === 1) {
                grid[i][j] = 0;
                queue.push([i, j]);
            }

    // BFS flood-fill from border
    while (queue.length) {
        const [i, j] = queue.shift();
        for (const [di, dj] of dirs) {
            const ni = i + di, nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {
                grid[ni][nj] = 0;
                queue.push([ni, nj]);
            }
        }
    }

    // Count remaining enclosed land cells
    return grid.flat().reduce((sum, v) => sum + v, 0);
}
```

**Complexity:** Time O(m × n) | Space O(m × n)

---

## 5. 3Sum With Multiplicity

**Problem:**
Given an integer array `arr` and an integer `target`, return the number of tuples `(i, j, k)` such that `i < j < k` and `arr[i] + arr[j] + arr[k] == target`. Return the answer modulo 10⁹ + 7.

**Visual Example 1** — `arr = [1,1,2,2,3,3,4,4,5,5]`, `target = 8`:
```
Value triples that sum to 8:

(1, 2, 5):  freq[1]=2, freq[2]=2, freq[5]=2  → 2×2×2 = 8 tuples
(1, 3, 4):  freq[1]=2, freq[3]=2, freq[4]=2  → 2×2×2 = 8 tuples
(2, 2, 4):  freq[2]=2, freq[4]=2             → C(2,2)×2 = 1×2 = 2 tuples
(2, 3, 3):  freq[2]=2, freq[3]=2             → 2×C(2,2) = 2×1 = 2 tuples
                                               ─────────────────────────
                                               Total = 20 ✓
```

**Visual Example 2** — `arr = [1,1,2,2,2,2]`, `target = 5`:
```
freq[1] = 2,  freq[2] = 4

Only valid triple: (1, 2, 2)
  → a=1 (distinct), b=c=2

  Formula: freq[1] × C(freq[2], 2)
         = 2 × (4×3/2)
         = 2 × 6
         = 12 ✓

Choosing visually:
  From [1, 1]       → pick 1 value:  2 ways
  From [2, 2, 2, 2] → pick 2 values: 6 ways
  2 × 6 = 12
```

**Combinatorics cases:**

| Case | Formula | Meaning |
|------|---------|---------|
| `a == b == c` | `f*(f-1)*(f-2) / 6` | Choose 3 from same value: C(f,3) |
| `a == b != c` | `fa*(fa-1)/2 * fc` | Choose 2 from a: C(fa,2), 1 from c |
| `a != b == c` | `fa * fb*(fb-1)/2` | 1 from a, choose 2 from b: C(fb,2) |
| all distinct  | `fa * fb * fc` | 1 from each |

**Approach:** Build a frequency map, then iterate over all unique value triples `(a ≤ b ≤ c)` where `a + b + c == target`. Count valid index tuples using the combinatorics table above.

```javascript
function threeSumMulti(arr, target) {
    const MOD = 1_000_000_007n;
    const freq = new Array(101).fill(0n);

    for (const x of arr) freq[x]++;

    let ans = 0n;

    for (let a = 0; a <= 100; a++) {
        for (let b = a; b <= 100; b++) {
            const c = target - a - b;
            if (c < b || c > 100) continue;

            const [fa, fb, fc] = [freq[a], freq[b], freq[c]];

            if (a === b && b === c) {
                ans += fa * (fa - 1n) * (fa - 2n) / 6n;
            } else if (a === b) {
                ans += fa * (fa - 1n) / 2n * fc;
            } else if (b === c) {
                ans += fa * fb * (fb - 1n) / 2n;
            } else {
                ans += fa * fb * fc;
            }
        }
    }

    return Number(ans % MOD);
}
```

**Complexity:** Time O(n + V²) where V = 101 | Space O(V)

---

## 6. Snapshot Array

**Problem:**
Implement a `SnapshotArray` that supports:
- `SnapshotArray(length)` — initializes the array with all zeros
- `set(index, val)` — sets `array[index] = val`
- `snap()` — takes a snapshot, returns the `snap_id` (0-indexed count of snaps taken)
- `get(index, snap_id)` — returns the value at `index` at the time of the given snapshot

**Visual Example:**
```
SnapshotArray(3)         data = [ [[0,0]], [[0,0]], [[0,0]] ]
                                    idx0     idx1     idx2
                                 (snap_id, value) pairs per index

set(0, 5)                data = [ [[0,5]], [[0,0]], [[0,0]] ]
                                    ↑ overwrite snap_id=0 entry

snap()  → returns 0      snapId: 0 → 1

set(0, 6)                data = [ [[0,5],[1,6]], [[0,0]], [[0,0]] ]
                                    ↑ new entry for snap_id=1

get(0, snap_id=0)
  history = [[0,5], [1,6]]
  binary search: largest snap_id ≤ 0  →  [0, 5]  →  return 5 ✓
```

**Visual — binary search on history:**
```
index 0 history:  [ [0,5],  [1,6],  [3,9],  [7,2] ]
snap_ids:             0       1       3       7

get(0, snap_id=4):
  lo=0, hi=3
  mid=2 → history[2][0]=3 ≤ 4 → lo=2
  mid=3 → history[3][0]=7 > 4 → hi=2
  lo==hi=2 → return history[2][1] = 9 ✓

get(0, snap_id=1):
  binary search → history[1][0]=1 ≤ 1 → return history[1][1] = 6 ✓
```

**Approach:** Store a per-index change log of `[snap_id, value]` pairs — only written on `set()`. On `get()`, binary search the log for the largest `snap_id ≤` the requested one. Far more memory-efficient than copying the full array on every snap.

```javascript
class SnapshotArray {
    constructor(length) {
        // Each index stores a list of [snap_id, value] pairs
        // Pre-seed with [0, 0] so every index has a baseline
        this.data = Array.from({ length }, () => [[0, 0]]);
        this.snapId = 0;
    }

    set(index, val) {
        const history = this.data[index];
        // If already recorded a change at current snap_id, overwrite it
        if (history[history.length - 1][0] === this.snapId) {
            history[history.length - 1][1] = val;
        } else {
            history.push([this.snapId, val]);
        }
    }

    snap() {
        return this.snapId++;
    }

    get(index, snap_id) {
        const history = this.data[index];

        // Binary search for largest snap_id <= requested snap_id
        let lo = 0, hi = history.length - 1;
        while (lo < hi) {
            const mid = Math.ceil((lo + hi) / 2);
            if (history[mid][0] <= snap_id) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return history[lo][1];
    }
}
```

**Complexity:**

| Operation | Time | Space |
|-----------|------|-------|
| `set` | O(1) | O(1) per call |
| `snap` | O(1) | O(1) |
| `get` | O(log s) — s = number of changes at that index | — |
| Overall space | — | O(n + total set calls) |

---

## 7. Longest Palindrome by Concatenating Two-Letter Words

**Problem:**
Given an array of 2-letter strings `words`, create the longest palindrome by selecting and concatenating some elements (each at most once). Return the length of the longest palindrome possible.

**Visual — two types of contributions:**
```
Type 1: Mirrored pairs  →  place one on each side
  "lc" + ... + "cl"   adds 4 to length per pair

Type 2: Palindrome words (e.g. "gg", "cc")
  Pairs:  "gg" + ... + "gg"   adds 4 per pair (one each side)
  Center: one leftover "gg"   adds 2 (sits in the middle)

Structure of longest palindrome:
  [ mirrored left ] + [ palindrome pairs ] + [ center? ] + [ palindrome pairs ] + [ mirrored right ]
  e.g.  "ty"  +  "lc"  +  "gg"  +  "cl"  +  "yt"
         ←────────────────────────────────────────→  reads same forwards & backwards
```

**Visual Example 1:** `words = ["lc","cl","gg"]`
```
count: { lc:1, cl:1, gg:1 }

"lc" ↔ "cl":  mirrored pair → min(1,1) = 1 pair → +4
"gg":          palindrome word, freq=1 → 0 pairs, 1 leftover → center +2

total = 4 + 2 = 6 ✓   →   "lc" + "gg" + "cl"
```

**Visual Example 2:** `words = ["ab","ty","yt","lc","cl","ab"]`
```
count: { ab:2, ty:1, yt:1, lc:1, cl:1 }

"ab" ↔ "ba":  rev="ba" not in map → 0 pairs
"ty" ↔ "yt":  min(1,1) = 1 pair  → +4
"lc" ↔ "cl":  min(1,1) = 1 pair  → +4

total = 8 ✓   →   "ty" + "lc" + "cl" + "yt"
```

**Visual Example 3:** `words = ["cc","ll","xx"]`
```
count: { cc:1, ll:1, xx:1 }

"cc": freq=1 → 0 pairs, leftover → center +2, centerUsed=true
"ll": freq=1 → 0 pairs, leftover → centerUsed already → skip
"xx": freq=1 → 0 pairs, leftover → centerUsed already → skip

total = 2 ✓   (only one palindrome word can sit in the center)
```

**Approach:** Use a frequency map. For mirrored pairs (`"lc"`/`"cl"`), count how many pairs exist and add 4 each. For palindrome words (`"gg"`), use pairs on both sides (+4 each), and place at most one leftover in the center (+2).

```javascript
function longestPalindrome(words) {
    const count = new Map();
    for (const w of words) {
        count.set(w, (count.get(w) ?? 0) + 1);
    }

    let length = 0;
    let centerUsed = false;

    for (const [word, freq] of count) {
        const rev = word[1] + word[0];

        if (word === rev) {
            // Palindrome word (e.g. "gg"): use pairs, save one for center
            length += Math.floor(freq / 2) * 4;
            if (freq % 2 === 1 && !centerUsed) {
                length += 2;
                centerUsed = true;
            }
        } else if (word < rev) {
            // Mirrored pair — word < rev guard ensures we process each pair once
            const pairs = Math.min(freq, count.get(rev) ?? 0);
            length += pairs * 4;
        }
    }

    return length;
}
```

**Complexity:** Time O(n) | Space O(n)
