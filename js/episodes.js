/* ============================================
   SQLクエスト - 全10話エピソード定義
   ============================================ */

const EPISODES = [
    // ===== 第1話 =====
    {
        id: 1,
        title: '深夜の展示室と消えた「蒼き涙」',
        subtitle: 'SELECT, FROM, WHERE の基本',
        difficulty: '初級',
        sqlFile: 'sql/episode01.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「深夜の美術館で、時価3億円の宝石《蒼き涙》が盗まれた。まずは関係者を洗い出す。この美術館に所属する全スタッフのリストを見せてくれ。」',
                instruction: '美術館の全スタッフリストを表示せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword' },
                    { text: '*',           type: 'symbol'  },
                    { text: 'FROM',        type: 'keyword' },
                    { text: 'employees',   type: 'table'   },
                    { text: ';',           type: 'symbol'  },
                    { text: 'WHERE',       type: 'keyword' },
                    { text: 'access_logs', type: 'table'   },
                ],
                answer: 'SELECT * FROM employees;',
                hint: '<code>SELECT *</code> はテーブルの全列を取得するコマンドです。<code>FROM テーブル名</code> でどのテーブルから取るかを指定します。',
                successMessage: '全スタッフ4名の情報を取得した。次は犯行時刻の行動を調べよう。',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「宝石が盗まれたのは20時以降だ。その時間帯にゲートを通って入館した記録を調べてくれ。怪しい奴を炙り出すんだ。」',
                instruction: '20時以降に「入館(enter)」した記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',       type: 'keyword'  },
                    { text: '*',            type: 'symbol'   },
                    { text: 'FROM',         type: 'keyword'  },
                    { text: 'access_logs',  type: 'table'    },
                    { text: 'WHERE',        type: 'keyword'  },
                    { text: "action = 'enter'", type: 'value' },
                    { text: 'AND',          type: 'operator' },
                    { text: "timestamp >= '2026-03-31 20:00'", type: 'value' },
                    { text: ';',            type: 'symbol'   },
                    { text: 'OR',           type: 'operator' },
                    { text: 'employees',    type: 'table'    },
                    { text: "action = 'exit'", type: 'value' },
                ],
                answer: "SELECT * FROM access_logs WHERE action = 'enter' AND timestamp >= '2026-03-31 20:00';",
                hint: '<code>WHERE</code> で条件を絞り込めます。複数条件は <code>AND</code> でつなぎます。<br>時刻の比較は <code>timestamp >= \'2026-03-31 20:00\'</code> のように書きます。',
                successMessage: '20時以降の入館記録は1件。employee_id = 104 の人物だ……。名前を特定しよう！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「IDだけでは報告書にならない。スタッフ名簿とログを突き合わせて、犯人の名前と役職を明らかにしろ。これで事件は解決だ！」',
                instruction: 'スタッフ名・役職・入館時刻を結合して表示せよ。',
                chips: [
                    { text: 'SELECT',         type: 'keyword' },
                    { text: 'E.name,',        type: 'column'  },
                    { text: 'E.role,',        type: 'column'  },
                    { text: 'A.timestamp',    type: 'column'  },
                    { text: 'FROM',           type: 'keyword' },
                    { text: 'employees AS E', type: 'table'   },
                    { text: 'JOIN',           type: 'keyword' },
                    { text: 'access_logs AS A', type: 'table'  },
                    { text: 'ON',             type: 'keyword' },
                    { text: 'E.employee_id = A.employee_id', type: 'operator' },
                    { text: 'WHERE',          type: 'keyword' },
                    { text: "A.action = 'enter'", type: 'value' },
                    { text: 'AND',            type: 'operator' },
                    { text: "A.timestamp >= '2026-03-31 20:00'", type: 'value' },
                    { text: ';',              type: 'symbol'  },
                    { text: 'LEFT JOIN',      type: 'keyword' },
                    { text: 'A.log_id',       type: 'column'  },
                ],
                answer: "SELECT E.name, E.role, A.timestamp FROM employees AS E JOIN access_logs AS A ON E.employee_id = A.employee_id WHERE A.action = 'enter' AND A.timestamp >= '2026-03-31 20:00';",
                hint: '<code>JOIN ... ON</code> で2つのテーブルを結合できます。<br><code>employees AS E</code> のように別名をつけると、<code>E.name</code> のように短く書けます。',
                successMessage: '犯人は 高橋 健一（夜間警備員）だ！ 20:30に入館し、警備の立場を利用して《蒼き涙》を盗み出していた！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>事件ファイル #2026-0331</strong></p>
            <p>───────────────</p>
            <p>🏛️ 発生場所: 国立近代美術館</p>
            <p>💎 被害品: 宝石《蒼き涙》（時価3億円）</p>
            <p>🕐 犯行時刻: 2026年3月31日 20:30以降</p>
            <p>───────────────</p>
            <p>🔍 犯人: <span class="suspect-name">高橋 健一（夜間警備員）</span></p>
            <p>📋 手口: 警備シフトを利用し、20:30に単独入館。</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>SELECT * FROM</code></p>
            <p>&nbsp;&nbsp;• <code>WHERE ... AND ...</code></p>
            <p>&nbsp;&nbsp;• <code>JOIN ... ON ...</code></p>
        `,
    },

    // ===== 第2話 =====
    {
        id: 2,
        title: '嘘つきなアリバイ',
        subtitle: 'WHERE (AND, OR, NOT)',
        difficulty: '初級',
        sqlFile: 'sql/episode02.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「容疑者4人が証言を出した。まずは全員の証言内容を確認するぞ。」',
                instruction: '容疑者リストを全件表示せよ。',
                chips: [
                    { text: 'SELECT',   type: 'keyword' },
                    { text: '*',        type: 'symbol'  },
                    { text: 'FROM',     type: 'keyword' },
                    { text: 'suspects', type: 'table'   },
                    { text: ';',        type: 'symbol'  },
                    { text: 'WHERE',    type: 'keyword' },
                    { text: 'room_logs',type: 'table'   },
                ],
                answer: 'SELECT * FROM suspects;',
                hint: '全件取得は <code>SELECT * FROM テーブル名;</code> です。',
                successMessage: '4人の証言を確認した。次は実際の移動ログと照合しよう。',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「山田は『ずっとA室にいた』と言っている。本当にA室以外に行っていないか調べろ。」',
                instruction: '山田（suspect_id=1）のA室以外の移動記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',       type: 'keyword'  },
                    { text: '*',            type: 'symbol'   },
                    { text: 'FROM',         type: 'keyword'  },
                    { text: 'room_logs',    type: 'table'    },
                    { text: 'WHERE',        type: 'keyword'  },
                    { text: 'suspect_id = 1', type: 'value'  },
                    { text: 'AND',          type: 'operator' },
                    { text: "room != 'A室'",type: 'value'    },
                    { text: ';',            type: 'symbol'   },
                    { text: 'OR',           type: 'operator' },
                    { text: "room = 'A室'", type: 'value'    },
                    { text: 'NOT',          type: 'operator' },
                ],
                answer: "SELECT * FROM room_logs WHERE suspect_id = 1 AND room != 'A室';",
                hint: '「〜ではない」は <code>!=</code> で表現します。<br><code>WHERE suspect_id = 1 AND room != \'A室\'</code> で山田のA室以外の記録を取得できます。',
                successMessage: '山田は20:30にD室にいた！ 「ずっとA室にいた」は嘘だ！',
                highlightRows: [0],
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「小林は『A室にもB室にも行っていない』と証言した。本当か？ A室またはB室に行った記録を調べろ。」',
                instruction: '小林（suspect_id=4）のA室またはB室の記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',       type: 'keyword'  },
                    { text: '*',            type: 'symbol'   },
                    { text: 'FROM',         type: 'keyword'  },
                    { text: 'room_logs',    type: 'table'    },
                    { text: 'WHERE',        type: 'keyword'  },
                    { text: 'suspect_id = 4', type: 'value'  },
                    { text: 'AND',          type: 'operator' },
                    { text: '(',            type: 'symbol'   },
                    { text: "room = 'A室'", type: 'value'    },
                    { text: 'OR',           type: 'operator' },
                    { text: "room = 'B室'", type: 'value'    },
                    { text: ')',            type: 'symbol'   },
                    { text: ';',            type: 'symbol'   },
                    { text: "room = 'C室'", type: 'value'    },
                ],
                answer: "SELECT * FROM room_logs WHERE suspect_id = 4 AND (room = 'A室' OR room = 'B室');",
                hint: '<code>OR</code> を使うと「AまたはB」を表現できます。<br><code>AND</code> と <code>OR</code> を組み合わせるときは <code>()</code> で優先順位を明示しましょう。',
                successMessage: '小林は20:10にA室にいた！ 「A室には行っていない」は嘘だった。2人の嘘つきを暴いた！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>事件ファイル #2026-0331-B</strong></p>
            <p>───────────────</p>
            <p>🔍 嘘つき1: <span class="suspect-name">山田 一郎</span></p>
            <p>　証言「ずっとA室にいた」→ 実際はD室にも移動</p>
            <p>🔍 嘘つき2: <span class="suspect-name">小林 裕子</span></p>
            <p>　証言「A室には行っていない」→ 実際はA室に入室</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>WHERE ... AND ...</code></p>
            <p>&nbsp;&nbsp;• <code>!= (NOT EQUAL)</code></p>
            <p>&nbsp;&nbsp;• <code>OR</code> と <code>()</code> の優先順位</p>
        `,
    },

    // ===== 第3話 =====
    {
        id: 3,
        title: 'ボスの特徴を絞り込め',
        subtitle: 'LIKE (ワイルドカード検索)',
        difficulty: '初級',
        sqlFile: 'sql/episode03.sql',
        missions: [
            {
                id: 1,
                portrait: '👁️',
                story: '目撃者「ボスは名前のどこかに『藤』がつく人物だった……」',
                instruction: '名前に「藤」が含まれる人物を検索せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'persons',   type: 'table'   },
                    { text: 'WHERE',     type: 'keyword' },
                    { text: "name LIKE '%藤%'", type: 'value' },
                    { text: ';',         type: 'symbol'  },
                    { text: "name LIKE '藤%'", type: 'value' },
                    { text: "role LIKE '%長'", type: 'value' },
                ],
                answer: "SELECT * FROM persons WHERE name LIKE '%藤%';",
                hint: '<code>LIKE \'%藤%\'</code> で「藤」を含む文字列を検索できます。<br><code>%</code> は「0文字以上の任意の文字」を意味するワイルドカードです。',
                successMessage: '「藤」がつく人物が7人見つかった。さらに絞り込もう！',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '👁️',
                story: '目撃者「そうだ、役職が『長』で終わる偉い人だったはず……」',
                instruction: '名前に「藤」が含まれ、かつ役職が「長」で終わる人物を検索せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'persons',   type: 'table'    },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: "name LIKE '%藤%'", type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: "role LIKE '%長'", type: 'value' },
                    { text: ';',         type: 'symbol'   },
                    { text: 'OR',        type: 'operator' },
                    { text: "description LIKE '%メガネ%'", type: 'value' },
                ],
                answer: "SELECT * FROM persons WHERE name LIKE '%藤%' AND role LIKE '%長';",
                hint: '条件を <code>AND</code> でつなぎます。<br><code>role LIKE \'%長\'</code> で「〜長」で終わる役職を検索できます。',
                successMessage: '候補が4人に絞れた。もう一つの特徴で特定しよう！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '👁️',
                story: '目撃者「最後にもう一つ。名字が『藤』で始まる人だった！ 名字の先頭が『藤』だ！」',
                instruction: '名前が「藤」で始まり、役職が「長」で終わる人物を検索せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'persons',   type: 'table'    },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: "name LIKE '藤%'", type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: "role LIKE '%長'", type: 'value' },
                    { text: ';',         type: 'symbol'   },
                    { text: "name LIKE '%藤%'", type: 'value' },
                    { text: "name LIKE '%藤'", type: 'value' },
                ],
                answer: "SELECT * FROM persons WHERE name LIKE '藤%' AND role LIKE '%長';",
                hint: '<code>LIKE \'藤%\'</code> で「藤」で始まる文字列を検索します。<br><code>%</code> の位置で「前方一致」「後方一致」「部分一致」を使い分けられます。',
                successMessage: 'ボスは 藤原 達也（会長）だ！ 白い帽子に杖……間違いない！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>捜査報告書 #03</strong></p>
            <p>───────────────</p>
            <p>🔍 特定されたボス:</p>
            <p><span class="suspect-name">藤原 達也（会長）</span></p>
            <p>　特徴: 白い帽子、杖を持つ</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>LIKE '%藤%'</code> (部分一致)</p>
            <p>&nbsp;&nbsp;• <code>LIKE '藤%'</code> (前方一致)</p>
            <p>&nbsp;&nbsp;• <code>LIKE '%長'</code> (後方一致)</p>
        `,
    },

    // ===== 第4話 =====
    {
        id: 4,
        title: '消された証拠品リスト',
        subtitle: 'ORDER BY, LIMIT',
        difficulty: '中級',
        sqlFile: 'sql/episode04.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「押収品が大量にある。まず全リストを値段が高い順に並べてくれ。」',
                instruction: '押収品を鑑定額の高い順に全件表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'seized_items', type: 'table' },
                    { text: 'ORDER BY',  type: 'keyword' },
                    { text: 'appraised_value', type: 'column' },
                    { text: 'DESC',      type: 'keyword' },
                    { text: ';',         type: 'symbol'  },
                    { text: 'ASC',       type: 'keyword' },
                    { text: 'LIMIT',     type: 'keyword' },
                ],
                answer: 'SELECT * FROM seized_items ORDER BY appraised_value DESC;',
                hint: '<code>ORDER BY 列名 DESC</code> で降順（大きい順）に並べ替えます。<br><code>ASC</code> は昇順（小さい順）です。',
                successMessage: '高額品の一覧が出た。上位5つに絞って換金ルートを追おう。',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「上位5品に絞り込め。盗品の換金ルートを追うぞ。」',
                instruction: '鑑定額TOP5の押収品を表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'seized_items', type: 'table' },
                    { text: 'ORDER BY',  type: 'keyword' },
                    { text: 'appraised_value', type: 'column' },
                    { text: 'DESC',      type: 'keyword' },
                    { text: 'LIMIT',     type: 'keyword' },
                    { text: '5',         type: 'value'   },
                    { text: ';',         type: 'symbol'  },
                    { text: '3',         type: 'value'   },
                    { text: 'ASC',       type: 'keyword' },
                ],
                answer: 'SELECT * FROM seized_items ORDER BY appraised_value DESC LIMIT 5;',
                hint: '<code>LIMIT 5</code> で結果を先頭5件に制限できます。<br><code>ORDER BY ... DESC LIMIT 5</code> でTOP5が取れます。',
                successMessage: '真珠のティアラ（1500万）、金の延べ棒（1200万）…高額品が並ぶ。宝飾品ばかりだ。',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「宝飾品だけに絞って、直近に押収されたものから表示しろ。最後に押収されたものが換金直前だったはずだ。」',
                instruction: '宝飾品のみを押収日が新しい順に表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'seized_items', type: 'table'  },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: "category = '宝飾品'", type: 'value' },
                    { text: 'ORDER BY',  type: 'keyword'  },
                    { text: 'seized_date', type: 'column'  },
                    { text: 'DESC',      type: 'keyword'  },
                    { text: ';',         type: 'symbol'   },
                    { text: "category = '現金'", type: 'value' },
                    { text: 'appraised_value', type: 'column' },
                ],
                answer: "SELECT * FROM seized_items WHERE category = '宝飾品' ORDER BY seized_date DESC;",
                hint: '<code>WHERE</code> で絞り込んだ後、<code>ORDER BY</code> で並べ替えます。<br>日付も文字列比較でソートできます。',
                successMessage: '4/5に押収されたプラチナのカフスと真珠のティアラ……換金直前だった！ルートが見えてきた。',
                highlightRows: [0, 1],
            },
        ],
        clearSummary: `
            <p>📁 <strong>証拠品分析レポート #04</strong></p>
            <p>───────────────</p>
            <p>💎 押収品 最高額: 真珠のティアラ（1,500万円）</p>
            <p>📦 押収品 総数: 12点</p>
            <p>🔍 換金直前の品: プラチナのカフス、真珠のティアラ</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>ORDER BY ... DESC/ASC</code></p>
            <p>&nbsp;&nbsp;• <code>LIMIT</code></p>
            <p>&nbsp;&nbsp;• <code>WHERE + ORDER BY</code> の組み合わせ</p>
        `,
    },

    // ===== 第5話 =====
    {
        id: 5,
        title: '下見の回数を数えろ',
        subtitle: 'COUNT, GROUP BY',
        difficulty: '中級',
        sqlFile: 'sql/episode05.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「過去1ヶ月の来館記録がある。まず各部屋の訪問回数を数えてくれ。」',
                instruction: '部屋ごとの訪問回数を集計せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: 'room,',     type: 'column'  },
                    { text: 'COUNT(*)',  type: 'keyword' },
                    { text: 'AS visit_count', type: 'column' },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'visit_logs', type: 'table'  },
                    { text: 'GROUP BY',  type: 'keyword' },
                    { text: 'room',      type: 'column'  },
                    { text: ';',         type: 'symbol'  },
                    { text: 'visitor_id', type: 'column' },
                    { text: 'ORDER BY',  type: 'keyword' },
                ],
                answer: 'SELECT room, COUNT(*) AS visit_count FROM visit_logs GROUP BY room;',
                hint: '<code>COUNT(*)</code> は行数を数えます。<br><code>GROUP BY room</code> で部屋ごとにグループ化して集計できます。',
                successMessage: '宝石展示室が12回で圧倒的に多い！ 誰かが下見をしていたな……',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「宝石展示室に異常なほど来ている奴がいるはずだ。人物ごとの訪問回数を出せ。」',
                instruction: '来館者ごとの宝石展示室の訪問回数を集計せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword'  },
                    { text: 'visitor_id,', type: 'column'   },
                    { text: 'COUNT(*)',    type: 'keyword'  },
                    { text: 'AS visit_count', type: 'column'},
                    { text: 'FROM',        type: 'keyword'  },
                    { text: 'visit_logs',  type: 'table'    },
                    { text: 'WHERE',       type: 'keyword'  },
                    { text: "room = '宝石展示室'", type: 'value' },
                    { text: 'GROUP BY',    type: 'keyword'  },
                    { text: 'visitor_id',  type: 'column'   },
                    { text: ';',           type: 'symbol'   },
                    { text: 'room',        type: 'column'   },
                ],
                answer: "SELECT visitor_id, COUNT(*) AS visit_count FROM visit_logs WHERE room = '宝石展示室' GROUP BY visitor_id;",
                hint: '<code>WHERE</code> で宝石展示室に絞り込み、<code>GROUP BY visitor_id</code> で人物ごとに集計します。',
                successMessage: 'visitor_id=1 が6回も来ている！ 名前を突き止めよう。',
                highlightRows: [0],
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「visitor_id=1 の名前を引っ張り出せ。これが下見犯だ！」',
                instruction: 'visitorsテーブルからID=1の人物を検索せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'visitors',  type: 'table'    },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'visitor_id = 1', type: 'value'},
                    { text: ';',         type: 'symbol'   },
                    { text: 'visit_logs', type: 'table'   },
                    { text: 'visitor_id = 2', type: 'value'},
                ],
                answer: 'SELECT * FROM visitors WHERE visitor_id = 1;',
                hint: 'visitorsテーブルから <code>visitor_id = 1</code> で絞り込みましょう。',
                successMessage: '下見犯は 黒田 悟 だ！ 1ヶ月で6回も宝石展示室に通っていた。犯行の共犯者か……！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>行動分析レポート #05</strong></p>
            <p>───────────────</p>
            <p>🔍 下見犯: <span class="suspect-name">黒田 悟</span></p>
            <p>　宝石展示室への訪問: 6回/月（異常値）</p>
            <p>　他の来館者平均: 1〜3回/月</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>COUNT(*)</code></p>
            <p>&nbsp;&nbsp;• <code>GROUP BY</code></p>
            <p>&nbsp;&nbsp;• <code>WHERE + GROUP BY</code> の組み合わせ</p>
        `,
    },

    // ===== 第6話 =====
    {
        id: 6,
        title: '共犯者の連絡網',
        subtitle: 'JOIN (内部結合)',
        difficulty: '中級',
        sqlFile: 'sql/episode06.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「高橋の通話記録が手に入った。まず全通話ログを確認する。」',
                instruction: '通話ログを全件表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'call_logs', type: 'table'   },
                    { text: ';',         type: 'symbol'  },
                    { text: 'contacts',  type: 'table'   },
                    { text: 'WHERE',     type: 'keyword' },
                ],
                answer: 'SELECT * FROM call_logs;',
                hint: '全件取得は <code>SELECT * FROM テーブル名;</code> です。',
                successMessage: '8件の通話記録。090-4444-0004 への通話が異常に多い。誰だ？',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「電話番号だけじゃ分からん。住所録と結合して、通話相手の名前を出せ！」',
                instruction: '通話ログと住所録をJOINして、相手の名前・関係・通話時間を表示せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword' },
                    { text: 'C.name,',     type: 'column'  },
                    { text: 'C.relationship,', type: 'column' },
                    { text: 'L.call_date,', type: 'column' },
                    { text: 'L.duration_sec', type: 'column' },
                    { text: 'FROM',        type: 'keyword' },
                    { text: 'call_logs AS L', type: 'table' },
                    { text: 'JOIN',        type: 'keyword' },
                    { text: 'contacts AS C', type: 'table'  },
                    { text: 'ON',          type: 'keyword' },
                    { text: 'L.receiver_phone = C.phone', type: 'operator' },
                    { text: ';',           type: 'symbol'  },
                    { text: 'L.caller_phone = C.phone', type: 'operator' },
                    { text: 'LEFT JOIN',   type: 'keyword' },
                ],
                answer: 'SELECT C.name, C.relationship, L.call_date, L.duration_sec FROM call_logs AS L JOIN contacts AS C ON L.receiver_phone = C.phone;',
                hint: '<code>JOIN contacts AS C ON L.receiver_phone = C.phone</code> で受信者の電話番号を住所録と結合します。',
                successMessage: '石井 悠太（関係: 不明）への長時間通話が目立つ。こいつが盗品の保管役か……！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「石井との通話だけに絞って詳細を見せろ。通話時間が長いほど怪しい。」',
                instruction: '石井宛ての通話を通話時間の長い順に表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'call_logs', type: 'table'    },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: "receiver_phone = '090-4444-0004'", type: 'value' },
                    { text: 'ORDER BY',  type: 'keyword'  },
                    { text: 'duration_sec', type: 'column' },
                    { text: 'DESC',      type: 'keyword'  },
                    { text: ';',         type: 'symbol'   },
                    { text: "caller_phone = '090-4444-0004'", type: 'value' },
                    { text: 'ASC',       type: 'keyword'  },
                ],
                answer: "SELECT * FROM call_logs WHERE receiver_phone = '090-4444-0004' ORDER BY duration_sec DESC;",
                hint: '<code>WHERE receiver_phone = \'090-4444-0004\'</code> で石井宛ての通話に絞ります。',
                successMessage: '犯行前日の3/30に60分（3600秒）の長電話……犯行計画の最終打ち合わせだ！石井 悠太が共犯者で確定！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>通信解析レポート #06</strong></p>
            <p>───────────────</p>
            <p>🔍 共犯者（盗品保管役）:</p>
            <p><span class="suspect-name">石井 悠太</span></p>
            <p>　犯行前3日間で計130分の通話</p>
            <p>　関係性: 不明 → 裏社会の仲介人と判明</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>JOIN ... ON ...</code></p>
            <p>&nbsp;&nbsp;• <code>WHERE + ORDER BY DESC</code></p>
        `,
    },

    // ===== 第7話 =====
    {
        id: 7,
        title: '空白の1時間を埋める',
        subtitle: 'BETWEEN, IN',
        difficulty: '上級',
        sqlFile: 'sql/episode07.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「監視カメラの映像を解析した。20:00〜21:00の記録を全部出してくれ。」',
                instruction: '20:00〜21:00の間のカメラ記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'camera_logs', type: 'table'   },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'recorded_at', type: 'column'  },
                    { text: 'BETWEEN',   type: 'keyword'  },
                    { text: "'2026-03-31 20:00'", type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: "'2026-03-31 21:00'", type: 'value' },
                    { text: ';',         type: 'symbol'   },
                    { text: "'2026-03-31 19:00'", type: 'value' },
                    { text: 'IN',        type: 'keyword'  },
                ],
                answer: "SELECT * FROM camera_logs WHERE recorded_at BETWEEN '2026-03-31 20:00' AND '2026-03-31 21:00';",
                hint: '<code>BETWEEN A AND B</code> で「A以上B以下」の範囲を指定できます。<br>日時でも使えます。',
                successMessage: '空白の1時間に9件の記録。裏口と非常階段の記録が気になる……',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「裏口か非常階段を使った記録だけを抜き出せ。正規ルート以外の移動は怪しい。」',
                instruction: '場所が「裏口」または「非常階段」の記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'camera_logs', type: 'table'   },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'location',  type: 'column'   },
                    { text: 'IN',        type: 'keyword'  },
                    { text: "('裏口', '非常階段')", type: 'value' },
                    { text: ';',         type: 'symbol'   },
                    { text: 'BETWEEN',   type: 'keyword'  },
                    { text: "location = '裏口'", type: 'value' },
                ],
                answer: "SELECT * FROM camera_logs WHERE location IN ('裏口', '非常階段');",
                hint: '<code>IN (\'値1\', \'値2\')</code> で「いずれかに一致」する条件を指定できます。<br><code>OR</code> を複数書くよりスッキリ！',
                successMessage: '不明人物Aが裏口と非常階段を行き来している！ しかも高橋も非常階段を使っている。',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「20:00〜21:00の間に裏口か非常階段を使った記録に絞り込め。BETWEEN と IN を組み合わせるんだ！」',
                instruction: '20:00〜21:00の間に裏口または非常階段を利用した記録を抽出せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'camera_logs', type: 'table'   },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'recorded_at', type: 'column'  },
                    { text: 'BETWEEN',   type: 'keyword'  },
                    { text: "'2026-03-31 20:00'", type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: "'2026-03-31 21:00'", type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: 'location',  type: 'column'   },
                    { text: 'IN',        type: 'keyword'  },
                    { text: "('裏口', '非常階段')", type: 'value' },
                    { text: ';',         type: 'symbol'   },
                    { text: 'OR',        type: 'operator' },
                ],
                answer: "SELECT * FROM camera_logs WHERE recorded_at BETWEEN '2026-03-31 20:00' AND '2026-03-31 21:00' AND location IN ('裏口', '非常階段');",
                hint: '<code>BETWEEN</code> と <code>IN</code> を <code>AND</code> で組み合わせます。<br>2つの条件を同時に満たすレコードだけが抽出されます。',
                successMessage: '「不明人物A」が裏口→非常階段→裏口と移動。高橋も非常階段に。2人は裏で合流していた！不明人物A＝石井悠太だ！',
                highlightRows: null,
            },
        ],
        clearSummary: `
            <p>📁 <strong>監視カメラ解析 #07</strong></p>
            <p>───────────────</p>
            <p>🔍 空白の1時間（20:00〜21:00）の真相:</p>
            <p><span class="suspect-name">不明人物A（＝石井 悠太）</span></p>
            <p>　裏口から侵入 → 非常階段で合流 → 裏口から脱出</p>
            <p>　高橋と非常階段で宝石を受け渡し</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>BETWEEN ... AND ...</code></p>
            <p>&nbsp;&nbsp;• <code>IN ('値1', '値2')</code></p>
            <p>&nbsp;&nbsp;• 複合条件の組み合わせ</p>
        `,
    },

    // ===== 第8話 =====
    {
        id: 8,
        title: '資金洗浄の証拠',
        subtitle: 'HAVING, SUM',
        difficulty: '上級',
        sqlFile: 'sql/episode08.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「銀行取引データを入手した。まず口座一覧を見せてくれ。」',
                instruction: '全口座情報を表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'bank_accounts', type: 'table' },
                    { text: ';',         type: 'symbol'  },
                    { text: 'transactions', type: 'table' },
                    { text: 'WHERE',     type: 'keyword' },
                ],
                answer: 'SELECT * FROM bank_accounts;',
                hint: '全件取得は <code>SELECT * FROM テーブル名;</code> です。',
                successMessage: '5つの口座を確認。不明口座Xが気になる……海外送金サービスか。',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「送金先ごとに合計額を出せ。100万円を超えている口座が怪しい。」',
                instruction: '送金先ごとの合計額を集計し、100万円超の口座を抽出せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: 'to_account,', type: 'column' },
                    { text: 'SUM(amount)', type: 'keyword' },
                    { text: 'AS total',  type: 'column'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'transactions', type: 'table' },
                    { text: 'GROUP BY',  type: 'keyword' },
                    { text: 'to_account', type: 'column' },
                    { text: 'HAVING',    type: 'keyword' },
                    { text: 'SUM(amount) > 1000000', type: 'value' },
                    { text: ';',         type: 'symbol'  },
                    { text: 'WHERE',     type: 'keyword' },
                    { text: 'SUM(amount) > 500000', type: 'value' },
                ],
                answer: 'SELECT to_account, SUM(amount) AS total FROM transactions GROUP BY to_account HAVING SUM(amount) > 1000000;',
                hint: '<code>SUM(amount)</code> で合計額を出します。<br><code>HAVING</code> は <code>GROUP BY</code> の後に集計結果を絞り込む条件です（<code>WHERE</code> とは違います）。',
                successMessage: '口座2（石井）に145万、口座5（海外送金）に165万……！ 石井が中継して海外に流している！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「石井の口座（ID=2）から海外送金口座（ID=5）への送金履歴を全部抜き出せ。これが資金洗浄の決定的証拠だ！」',
                instruction: '口座2から口座5への送金記録を日付順に表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'transactions', type: 'table'  },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'from_account = 2', type: 'value' },
                    { text: 'AND',       type: 'operator' },
                    { text: 'to_account = 5', type: 'value' },
                    { text: 'ORDER BY',  type: 'keyword'  },
                    { text: 'tx_date',   type: 'column'   },
                    { text: ';',         type: 'symbol'   },
                    { text: 'from_account = 1', type: 'value' },
                    { text: 'DESC',      type: 'keyword'  },
                ],
                answer: 'SELECT * FROM transactions WHERE from_account = 2 AND to_account = 5 ORDER BY tx_date;',
                hint: '<code>WHERE from_account = 2 AND to_account = 5</code> で送金元・送金先を限定します。',
                successMessage: '4/2から4/4にかけて計165万円を海外送金。これが資金洗浄の証拠だ！高橋→石井→海外の資金フローが確定した！',
                highlightRows: null,
            },
        ],
        clearSummary: `
            <p>📁 <strong>資金追跡レポート #08</strong></p>
            <p>───────────────</p>
            <p>💰 資金フロー:</p>
            <p>　高橋(口座1) → <span class="suspect-name">石井(口座2)</span> → 海外(口座5)</p>
            <p>　合計送金額: 165万円</p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>SUM()</code></p>
            <p>&nbsp;&nbsp;• <code>GROUP BY + HAVING</code></p>
            <p>&nbsp;&nbsp;• WHERE vs HAVING の違い</p>
        `,
    },

    // ===== 第9話 =====
    {
        id: 9,
        title: '偽装された身分',
        subtitle: 'Subquery (副問合せ)',
        difficulty: '上級',
        sqlFile: 'sql/episode09.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「過去の逮捕歴データベースにアクセスできた。偽名（alias）を使って逃亡した犯罪者がいる。まず全レコードを見ろ。」',
                instruction: '犯罪者記録を全件表示せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword' },
                    { text: '*',         type: 'symbol'  },
                    { text: 'FROM',      type: 'keyword' },
                    { text: 'criminal_records', type: 'table' },
                    { text: ';',         type: 'symbol'  },
                    { text: 'current_employees', type: 'table' },
                    { text: 'WHERE',     type: 'keyword' },
                ],
                answer: 'SELECT * FROM criminal_records;',
                hint: '全件取得は <code>SELECT * FROM テーブル名;</code> です。',
                successMessage: '4名の犯罪者が偽名を使っている。この偽名が現在の従業員名簿に紛れ込んでいないか……？',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「犯罪者の偽名リストの中に、現在の従業員がいないか調べろ。サブクエリを使うんだ！」',
                instruction: '犯罪者の偽名と一致する名前の従業員を検索せよ。',
                chips: [
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: '*',         type: 'symbol'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'current_employees', type: 'table' },
                    { text: 'WHERE',     type: 'keyword'  },
                    { text: 'name',      type: 'column'   },
                    { text: 'IN',        type: 'keyword'  },
                    { text: '(', type: 'symbol' },
                    { text: 'SELECT',    type: 'keyword'  },
                    { text: 'alias',     type: 'column'   },
                    { text: 'FROM',      type: 'keyword'  },
                    { text: 'criminal_records', type: 'table' },
                    { text: ')',         type: 'symbol'   },
                    { text: ';',         type: 'symbol'   },
                    { text: 'real_name', type: 'column'   },
                ],
                answer: 'SELECT * FROM current_employees WHERE name IN (SELECT alias FROM criminal_records);',
                hint: '<code>サブクエリ</code>（副問合せ）は <code>SELECT</code> の中に <code>SELECT</code> を入れる技法です。<br><code>WHERE name IN (SELECT alias FROM ...)</code> で偽名リストと照合できます。',
                successMessage: '3名の偽名従業員が見つかった！ 山本浩二、岡田由美、中島誠……全員偽名で入り込んでいた！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「犯罪者レコードから本名と偽名を並べて最終報告書を作れ。偽名が現在の従業員にいる奴だけだ。」',
                instruction: '現在の従業員に紛れている犯罪者の本名・偽名・犯罪種別を表示せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword'  },
                    { text: 'real_name,',  type: 'column'   },
                    { text: 'alias,',      type: 'column'   },
                    { text: 'crime_type',  type: 'column'   },
                    { text: 'FROM',        type: 'keyword'  },
                    { text: 'criminal_records', type: 'table' },
                    { text: 'WHERE',       type: 'keyword'  },
                    { text: 'alias',       type: 'column'   },
                    { text: 'IN',          type: 'keyword'  },
                    { text: '(',           type: 'symbol'   },
                    { text: 'SELECT',      type: 'keyword'  },
                    { text: 'name',        type: 'column'   },
                    { text: 'FROM',        type: 'keyword'  },
                    { text: 'current_employees', type: 'table' },
                    { text: ')',           type: 'symbol'   },
                    { text: ';',           type: 'symbol'   },
                    { text: 'employee_id', type: 'column'   },
                ],
                answer: 'SELECT real_name, alias, crime_type FROM criminal_records WHERE alias IN (SELECT name FROM current_employees);',
                hint: '今度は逆方向のサブクエリです。<br><code>WHERE alias IN (SELECT name FROM current_employees)</code> で従業員名簿に偽名がある犯罪者を抽出します。',
                successMessage: '石井悠太は「山本浩二」として清掃部に潜入、西田恵は「岡田由美」として受付に、森隆司は「中島誠」として倉庫管理に！犯罪ネットワークの全貌が見えた！',
                highlightRows: null,
            },
        ],
        clearSummary: `
            <p>📁 <strong>身元照合レポート #09</strong></p>
            <p>───────────────</p>
            <p>🔍 偽装身分者:</p>
            <p><span class="suspect-name">石井悠太 → 山本浩二（清掃部）</span></p>
            <p><span class="suspect-name">西田恵 → 岡田由美（受付）</span></p>
            <p><span class="suspect-name">森隆司 → 中島誠（倉庫管理部）</span></p>
            <p>───────────────</p>
            <p>✅ 学習した構文:</p>
            <p>&nbsp;&nbsp;• <code>WHERE ... IN (SELECT ...)</code></p>
            <p>&nbsp;&nbsp;• サブクエリ（副問合せ）</p>
        `,
    },

    // ===== 第10話（最終話） =====
    {
        id: 10,
        title: '蒼き涙の奪還',
        subtitle: 'LEFT JOIN, IS NULL',
        difficulty: '上級',
        sqlFile: 'sql/episode10.sql',
        missions: [
            {
                id: 1,
                portrait: '🕵️',
                story: '刑事「最終作戦だ。まず全展示品リストと現在の在庫を突き合わせる。LEFT JOIN で在庫にないものも含めて全部出せ。」',
                instruction: '展示品リストと在庫をLEFT JOINして全件表示せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword' },
                    { text: 'E.exhibit_name,', type: 'column' },
                    { text: 'E.category,',  type: 'column' },
                    { text: 'I.storage_location', type: 'column' },
                    { text: 'FROM',        type: 'keyword' },
                    { text: 'exhibit_list AS E', type: 'table' },
                    { text: 'LEFT JOIN',   type: 'keyword' },
                    { text: 'current_inventory AS I', type: 'table' },
                    { text: 'ON',          type: 'keyword' },
                    { text: 'E.exhibit_id = I.exhibit_id', type: 'operator' },
                    { text: ';',           type: 'symbol'  },
                    { text: 'JOIN',        type: 'keyword' },
                    { text: 'WHERE',       type: 'keyword' },
                ],
                answer: 'SELECT E.exhibit_name, E.category, I.storage_location FROM exhibit_list AS E LEFT JOIN current_inventory AS I ON E.exhibit_id = I.exhibit_id;',
                hint: '<code>LEFT JOIN</code> は左テーブルの全行を保持し、右テーブルに一致がなければ <code>NULL</code> になります。<br>通常の <code>JOIN</code> との違いを確認しよう。',
                successMessage: '7つの展示品のうち、storage_location が NULL のものが3つ……これが行方不明の品だ！',
                highlightRows: null,
            },
            {
                id: 2,
                portrait: '🕵️',
                story: '刑事「NULLのもの＝在庫にない＝行方不明だ。IS NULL で絞り込め！」',
                instruction: '在庫が存在しない（NULL）展示品を抽出せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword' },
                    { text: 'E.exhibit_name,', type: 'column' },
                    { text: 'E.category,',  type: 'column' },
                    { text: 'E.appraised_value', type: 'column' },
                    { text: 'FROM',        type: 'keyword' },
                    { text: 'exhibit_list AS E', type: 'table' },
                    { text: 'LEFT JOIN',   type: 'keyword' },
                    { text: 'current_inventory AS I', type: 'table' },
                    { text: 'ON',          type: 'keyword' },
                    { text: 'E.exhibit_id = I.exhibit_id', type: 'operator' },
                    { text: 'WHERE',       type: 'keyword' },
                    { text: 'I.inventory_id IS NULL', type: 'value' },
                    { text: ';',           type: 'symbol'  },
                    { text: 'I.inventory_id IS NOT NULL', type: 'value' },
                    { text: 'JOIN',        type: 'keyword' },
                ],
                answer: 'SELECT E.exhibit_name, E.category, E.appraised_value FROM exhibit_list AS E LEFT JOIN current_inventory AS I ON E.exhibit_id = I.exhibit_id WHERE I.inventory_id IS NULL;',
                hint: '<code>IS NULL</code> で「値がNULL（存在しない）」を判定します。<br><code>LEFT JOIN</code> + <code>IS NULL</code> は「片方にだけ存在するデータ」を見つける定番テクニックです。',
                successMessage: '蒼き涙、翡翠の龍、ダイヤモンドの涙……3点が行方不明。保管倉庫の情報と照合するぞ！',
                highlightRows: null,
            },
            {
                id: 3,
                portrait: '🕵️',
                story: '刑事「最後だ。捜査で判明した盗品の保管場所リストがある。蒼き涙はどこにある？ 突入先を特定しろ！」',
                instruction: '「蒼き涙」の保管倉庫の名前と住所を特定せよ。',
                chips: [
                    { text: 'SELECT',      type: 'keyword' },
                    { text: 'W.warehouse_name,', type: 'column' },
                    { text: 'W.address,',  type: 'column'  },
                    { text: 'W.owner',     type: 'column'  },
                    { text: 'FROM',        type: 'keyword' },
                    { text: 'evidence_locations AS EL', type: 'table' },
                    { text: 'JOIN',        type: 'keyword' },
                    { text: 'warehouses AS W', type: 'table' },
                    { text: 'ON',          type: 'keyword' },
                    { text: 'EL.warehouse_id = W.warehouse_id', type: 'operator' },
                    { text: 'WHERE',       type: 'keyword' },
                    { text: "EL.exhibit_name = '蒼き涙'", type: 'value' },
                    { text: ';',           type: 'symbol'  },
                    { text: 'LEFT JOIN',   type: 'keyword' },
                    { text: "EL.status = '所在不明'", type: 'value' },
                ],
                answer: "SELECT W.warehouse_name, W.address, W.owner FROM evidence_locations AS EL JOIN warehouses AS W ON EL.warehouse_id = W.warehouse_id WHERE EL.exhibit_name = '蒼き涙';",
                hint: 'evidence_locations と warehouses を <code>JOIN</code> して倉庫情報を取得します。<br><code>WHERE</code> で「蒼き涙」に絞り込みましょう。',
                successMessage: '蒼き涙は「港区倉庫A」（東京都港区海岸1-2-3）に保管されている！所有者は石井悠太！全員突入せよ！！',
                highlightRows: [0],
            },
        ],
        clearSummary: `
            <p>📁 <strong>最終捜査報告書 #10</strong></p>
            <p>═══════════════</p>
            <p>🎯 作戦名: オペレーション・ブルーティア</p>
            <p>───────────────</p>
            <p>💎 《蒼き涙》発見場所:</p>
            <p><span class="suspect-name">港区倉庫A（石井悠太 所有）</span></p>
            <p>　東京都港区海岸1-2-3</p>
            <p>───────────────</p>
            <p>🚔 逮捕者:</p>
            <p>　• 高橋 健一（実行犯）</p>
            <p>　• 石井 悠太（保管・資金洗浄）</p>
            <p>　• 西田 恵 / 森 隆司（潜入工作員）</p>
            <p>═══════════════</p>
            <p>💎 宝石《蒼き涙》は無事に美術館へ返還された。</p>
            <p>───────────────</p>
            <p>✅ 全10話で学習した構文:</p>
            <p>&nbsp;&nbsp;• SELECT, FROM, WHERE, AND, OR</p>
            <p>&nbsp;&nbsp;• LIKE, ORDER BY, LIMIT</p>
            <p>&nbsp;&nbsp;• COUNT, GROUP BY, HAVING, SUM</p>
            <p>&nbsp;&nbsp;• JOIN, LEFT JOIN, IS NULL</p>
            <p>&nbsp;&nbsp;• BETWEEN, IN, Subquery</p>
        `,
    },
];
