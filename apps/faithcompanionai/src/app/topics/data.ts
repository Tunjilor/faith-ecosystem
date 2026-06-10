// src/app/topics/data.ts

export type TopicData = {
  topic: string;
  title: string;
  description: string;
  intro: string;
  /** Human-readable subject used in templated section headings (e.g. "a Sick Parent").
   *  Defaults to a capitalized topic slug, so single-word topics need not set it. */
  label?: string;
  verses: Array<{ ref: string; text: string; context: string }>;
  /** Optional short devotional reflection (1–2 paragraphs), rendered between the verses and the prayer. */
  reflection?: string;
  prayer: string;
  /** Optional full devotional block (title + reflection + action steps). */
  devotional?: { title: string; reflection: string; actionSteps: string[] };
  /** Optional single "small step" rendered as its own card (used by prayer-focused topics). */
  actionStep?: string;
  /** Optional dedicated call-to-action linking to the live prayer tool (/tools/prayer → /api/ask). */
  prayerCta?: { text: string; buttonLabel: string };
  /** Optional explicit "Related" links. When set, replaces the auto "Explore other topics" list. */
  related?: Array<{ slug: string; label: string }>;
};

export const TOPICS: Record<string, TopicData> = {
  anxiety: {
    topic: "anxiety",
    title: "Bible Verses for Anxiety",
    description:
      "Scripture-based verses, a personal prayer, and a devotional reflection for anxiety. Find peace and calm through God's Word when worry overwhelms you.",
    intro:
      "Anxiety affects millions of people, and Scripture speaks directly and repeatedly to the anxious heart. These verses are not empty comfort — they are anchors proven over centuries of human experience. Below you'll find key Bible passages for anxiety, a prayer you can pray right now, and a short devotional to carry with you.",
    verses: [
      {
        ref: "Philippians 4:6–7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        context: "Paul wrote this from prison — a reminder that peace is possible in the worst circumstances, not just comfortable ones.",
      },
      {
        ref: "Matthew 6:34",
        text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
        context: "Jesus teaches here that anxiety is often about projecting future problems. He invites us back to the present.",
      },
      {
        ref: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        context: "God's direct word of reassurance. This verse has been a lifeline for believers in crisis for 2,700 years.",
      },
      {
        ref: "1 Peter 5:7",
        text: "Cast all your anxiety on him because he cares for you.",
        context: "The image is of physically throwing a burden onto God — an active, decisive release of worry.",
      },
      {
        ref: "Psalm 94:19",
        text: "When anxiety was great within me, your consolation brought me joy.",
        context: "A psalm that names anxiety directly — you are not alone in feeling it, and God's comfort is the answer.",
      },
    ],
    reflection:
      "Anxiety tells you that you are alone with your problem — that it is all on you to figure out, prevent, or fix. Scripture tells a different story. From Genesis to Revelation, God's repeated message is 'I am with you.' Not 'figure it out,' but 'I am here.'\n\nPhilippians 4:6–7 does not say anxiety will never come. It says when anxiety comes, bring it to God. The result is not always an immediate change in circumstances — it is peace that transcends understanding. A peace that doesn't make logical sense given the situation.\n\nThis is the Christian life: not a life free from trouble, but a life accompanied through it.",
    prayer:
      "Heavenly Father, I am carrying anxiety that I cannot seem to put down. You know the exact situation — the uncertainty, the fear, the what-ifs that keep cycling through my mind.\n\nYour Word says to bring everything to you in prayer and thanksgiving. So I am doing that now. Thank you for this day, even with its difficulties. Thank you that you are not surprised by anything I face.\n\nI confess that I have been trying to control what I cannot control. Forgive me for doubting your care.\n\nLord, give me the peace that passes understanding — the kind that guards my heart and mind even when nothing around me has changed. Help me to take the next step in front of me, and to leave the rest in your hands.\n\nNot my will, but yours be done. Amen.",
    actionStep:
      "Write down the one specific thing making you anxious right now, and underneath it write: \"God knows this, and he is with me in it.\" Then set a five-minute timer and pray Philippians 4:6–7 out loud over that exact worry — naming it to God instead of rehearsing it to yourself.",
    prayerCta: {
      text: "Anxious about something specific right now? Tell Faith Companion what's weighing on you and get a calming, Scripture-based prayer written for your exact situation.",
      buttonLabel: "Write a prayer for my anxiety",
    },
    related: [
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
    ],
  },

  hope: {
    topic: "hope",
    title: "Bible Verses for Hope",
    description:
      "Scripture-based verses, a personal prayer, and a devotional reflection for hope. Rediscover God's promises when the future feels uncertain.",
    intro:
      "Biblical hope is not wishful thinking — it is confident expectation rooted in the character of God. When circumstances are bleak and the future feels unclear, Scripture gives hope something solid to stand on. Here are key Bible verses about hope, a prayer for renewed hope, and a short devotional.",
    verses: [
      {
        ref: "Jeremiah 29:11",
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        context: "Spoken to Israelites in exile — people whose situation looked hopeless. God's plans operate on a longer timeline than ours.",
      },
      {
        ref: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        context: "Hope is not generated by willpower — it is a gift of the Spirit given to those who trust.",
      },
      {
        ref: "Romans 8:24–25",
        text: "For in this hope we were saved. But hope that is seen is no hope at all. Who hopes for what they already have? But if we hope for what we do not yet have, we wait for it patiently.",
        context: "Paul connects hope directly to salvation — and defines it as waiting with patience for what is not yet visible.",
      },
      {
        ref: "Psalm 31:24",
        text: "Be strong and take heart, all you who hope in the Lord.",
        context: "Hope in God is not passive resignation — it is an active, strengthening force.",
      },
      {
        ref: "Lamentations 3:22–23",
        text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        context: "Written in the darkest period of Israel's history — yet here is one of Scripture's greatest declarations of hope.",
      },
    ],
    prayer:
      "Father God, I come to you when hope feels thin. Circumstances have worn me down, and it is hard to see a future that looks different from today.\n\nYour Word says you are the God of hope — that you fill your people with joy and peace as they trust you. I want to trust you. Help me where my trust falls short.\n\nThank you that your mercies are new every morning. Even when I cannot see the path forward, your faithfulness has not changed.\n\nFill me with hope that doesn't depend on circumstances. Let the Holy Spirit renew my expectation that you are at work, even now, even here. Amen.",
    devotional: {
      title: "Hope That Holds in the Dark",
      reflection:
        "Real hope is tested in difficulty, not confirmed by it. The hope Paul writes about in Romans 8 is not the hope of good circumstances — it is the hope of resurrection, of a God who reverses death itself.\n\nThis kind of hope changes how you live while you wait. You can act with courage, extend grace to others, and face hard days without being destroyed — because you know how the story ends.\n\nIf your hope feels thin today, it may simply need feeding. Hope grows through Scripture, through prayer, and through remembering what God has already done.",
      actionSteps: [
        "Write down three things God has done in your life or the lives of people you know that required hope beforehand.",
        "Read Romans 8:18–25 slowly and sit with the phrase 'we wait for it patiently.' What are you currently waiting for?",
      ],
    },
  },

  strength: {
    topic: "strength",
    title: "Bible Verses for Strength",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for strength. Find courage and endurance in God's Word when you feel weak or overwhelmed.",
    intro:
      "Everyone reaches points of exhaustion — physically, emotionally, and spiritually. Scripture doesn't minimize this. It meets you in weakness and points to a strength that is not your own. Here are key Bible verses for strength, a prayer, and a devotional reflection.",
    verses: [
      {
        ref: "Isaiah 40:31",
        text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
        context: "One of the most beloved promises in Scripture — strength that is renewed by waiting on God, not by working harder.",
      },
      {
        ref: "Philippians 4:13",
        text: "I can do all this through him who gives me strength.",
        context: "Often misquoted as unlimited capability — in context, Paul is speaking of contentment and endurance in hardship through Christ.",
      },
      {
        ref: "2 Corinthians 12:9–10",
        text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
        context: "Paul's thorn in the flesh — God's answer was not removal of weakness, but grace that is enough within it.",
      },
      {
        ref: "Psalm 46:1",
        text: "God is our refuge and strength, an ever-present help in trouble.",
        context: "This psalm was likely written during a military threat — strength found not in weapons but in God's presence.",
      },
      {
        ref: "Joshua 1:9",
        text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
        context: "God's command to Joshua as he faced an impossible task. The same word applies to any impossible situation you face.",
      },
    ],
    prayer:
      "Lord, I am tired. The kind of tired that sleep doesn't fully fix. I've been pushing through, and I'm running out of my own strength.\n\nYour Word says those who hope in you will renew their strength. I am choosing to hope in you today — even when I don't feel it, even when I can't see how things will improve.\n\nThank you that your power is made perfect in weakness. That means my limits are not a problem for you. Help me to stop straining in my own effort and to rest in yours.\n\nGive me the strength to do what today requires — and nothing more. I trust you with the rest. Amen.",
    devotional: {
      title: "The Strength That Comes from Waiting",
      reflection:
        "Isaiah 40:31 ties renewed strength to hope in God — not to effort, not to willpower, not to better strategies. The Hebrew word for 'renew' literally means 'to exchange' — as if you hand God your depleted strength and receive his in return.\n\nThis kind of strength is counterintuitive. It comes in the moments you admit you don't have it. It grows in the spaces between striving — in stillness, in prayer, in honest surrender.\n\nIf you are exhausted today, the invitation is not to push harder. It is to wait on the God who renews.",
      actionSteps: [
        "Identify one thing you are trying to handle in your own strength. Explicitly pray it over to God today.",
        "Rest deliberately — take 15 minutes today doing nothing productive, and invite God into that rest.",
      ],
    },
  },

  healing: {
    topic: "healing",
    title: "Bible Verses for Healing",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for healing. Whether physical, emotional, or spiritual — find God's comfort and restoration in His Word.",
    intro:
      "Healing in Scripture covers far more than physical restoration. It includes emotional wholeness, forgiveness of sin, relational repair, and spiritual renewal. Here are key Bible verses for healing of every kind, a prayer, and a devotional.",
    verses: [
      {
        ref: "Isaiah 53:5",
        text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
        context: "The foundational healing verse in Scripture — spiritual healing through Christ's sacrifice, with implications for all dimensions of healing.",
      },
      {
        ref: "Psalm 147:3",
        text: "He heals the brokenhearted and binds up their wounds.",
        context: "God described as a physician of emotional wounds — not only physical ones.",
      },
      {
        ref: "Jeremiah 17:14",
        text: "Heal me, Lord, and I will be healed; save me and I will be saved, for you are the one I praise.",
        context: "A direct, honest prayer for healing — Scripture itself teaches us it's appropriate to ask God for healing.",
      },
      {
        ref: "James 5:14–15",
        text: "Is anyone among you sick? Let them call the elders of the church to pray over them and anoint them with oil in the name of the Lord. And the prayer offered in faith will make the sick person well.",
        context: "Healing through community and prayer — God often works healing through the body of believers.",
      },
      {
        ref: "Psalm 103:2–3",
        text: "Praise the Lord, my soul, and forget not all his benefits — who forgives all your sins and heals all your diseases.",
        context: "Healing positioned alongside forgiveness — both are the work of the same God who restores.",
      },
    ],
    prayer:
      "Father, I come to you in need of healing — [for my body / for my heart / for this wound I carry]. You know the exact nature of what needs to be made whole. I don't need to explain it fully.\n\nYour Word says you heal the brokenhearted and bind up their wounds. You are the Lord who heals. I believe that. Help me where my belief falls short.\n\nI ask for your healing touch — in whatever form and timeline you choose. I trust that your ways are higher than mine.\n\nAnd while I wait, give me peace in the waiting. Let your presence itself be the first layer of healing, even before circumstances change. Amen.",
    devotional: {
      title: "Healing That Starts From the Inside",
      reflection:
        "The Bible's vision of healing is broader than the medical model. Jesus healed bodies, but he also healed shame (the woman at the well), isolation (the lepers), fear (the disciples in the storm), and grief (Mary at Lazarus's tomb).\n\nHealing in Scripture is always moving toward wholeness — shalom. The Hebrew word means peace, completeness, nothing missing. This kind of healing is available even when physical circumstances don't change.\n\nBring whatever is broken to the God who heals. He may move quickly or slowly. But he moves — and the first movement is always toward you.",
      actionSteps: [
        "Name one specific thing you need healing in — be honest about what it is. Bring it to God in prayer using Jeremiah 17:14 as your template.",
        "If you are dealing with physical illness, ask one person you trust to pray with you this week.",
      ],
    },
  },

  forgiveness: {
    topic: "forgiveness",
    title: "Bible Verses for Forgiveness",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for forgiveness. Find freedom from guilt, and the strength to forgive others, through God's Word.",
    intro:
      "Forgiveness is one of the most transformative — and most difficult — acts in the Christian life. Scripture speaks to both receiving forgiveness from God and extending it to others. Here are key verses, a prayer, and a devotional on forgiveness.",
    verses: [
      {
        ref: "1 John 1:9",
        text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.",
        context: "A direct promise: confession leads to forgiveness. Not based on our worthiness but on God's faithfulness.",
      },
      {
        ref: "Ephesians 4:32",
        text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
        context: "The standard for forgiving others is God's forgiveness of us — not what others deserve.",
      },
      {
        ref: "Psalm 103:12",
        text: "As far as the east is from the west, so far has he removed our transgressions from us.",
        context: "A spatial metaphor for total removal — east and west never meet; God's forgiveness is complete.",
      },
      {
        ref: "Isaiah 43:25",
        text: "I, even I, am he who blots out your transgressions, for my own sake, and remembers your sins no more.",
        context: "God's forgiveness is so thorough that he chooses not to remember — a profound act of divine mercy.",
      },
      {
        ref: "Colossians 3:13",
        text: "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you.",
        context: "Forgiving others is presented as normal Christian life — not an extraordinary achievement.",
      },
    ],
    prayer:
      "Father, I need your forgiveness. I have done things I regret — said words, made choices, harbored attitudes that are not what you call me to. I confess them to you now.\n\nYour Word promises that if I confess, you are faithful and just to forgive. I receive that forgiveness today. Thank you that my failures are not held against me in Christ.\n\nI also ask for help forgiving [name/situation]. The hurt is real, and I can't manufacture forgiveness on my own. Give me your heart toward them — not a dismissal of the wrong, but a release of the debt.\n\nFree me from both the guilt of what I've done and the bitterness of what has been done to me. Amen.",
    devotional: {
      title: "Forgiveness Is Not Forgetting",
      reflection:
        "One of the greatest obstacles to forgiving others is the belief that forgiveness means pretending it didn't happen — minimizing the pain or restoring trust automatically. It doesn't.\n\nBiblical forgiveness is releasing the debt, not denying the damage. It is choosing to stop keeping score, not because the offense doesn't matter, but because you are releasing the outcome to God.\n\nReceiving God's forgiveness works the same way. You don't earn it by minimizing your failures. You receive it by confessing them and trusting that Christ's work is enough. It is.",
      actionSteps: [
        "Write down one thing you feel guilty about and bring it to God in prayer using 1 John 1:9. Then write 'Forgiven' across it.",
        "Think of one person you are struggling to forgive. Pray for them specifically today — not that you feel forgiving, but that God would bless them.",
      ],
    },
  },

  peace: {
    topic: "peace",
    title: "Bible Verses for Peace",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for peace. Find the peace that passes understanding through God's Word in troubled times.",
    intro:
      "The peace God offers is unlike anything the world provides. It doesn't depend on circumstances being right or resolved. It is a settled confidence that God is present and in control. Here are key Bible verses about peace, a prayer, and a short devotional.",
    verses: [
      {
        ref: "John 14:27",
        text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
        context: "Jesus speaks this to his disciples hours before his arrest — peace given in the most turbulent possible moment.",
      },
      {
        ref: "Philippians 4:7",
        text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        context: "Peace as a guard — active and protective. It does not make sense to observers but it is real.",
      },
      {
        ref: "Isaiah 26:3",
        text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
        context: "'Perfect peace' in Hebrew is shalom shalom — doubled for emphasis. Available to those whose minds are fixed on God.",
      },
      {
        ref: "Romans 5:1",
        text: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.",
        context: "The ultimate peace — restored relationship with God. This is the foundation all other peace rests on.",
      },
      {
        ref: "Psalm 4:8",
        text: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
        context: "A prayer before sleep — trusting God with the night and the uncertainty of tomorrow.",
      },
    ],
    prayer:
      "Lord Jesus, you promised a peace the world cannot give — a peace that goes beyond understanding. I need that peace today.\n\nMy mind keeps returning to [the problem / the uncertainty / the conflict]. I can't seem to let it rest.\n\nHelp me to bring every anxious thought captive to you. Guard my heart and my mind. Settle me in a way I cannot manufacture on my own.\n\nThank you that I have peace with God through Christ. Help me to live from that foundation today. Let your peace rule in my heart, and let it overflow into how I treat the people around me. Amen.",
    devotional: {
      title: "The Peace That Doesn't Make Sense",
      reflection:
        "Philippians 4:7 describes God's peace as something that 'transcends all understanding.' This is not peace that makes sense given the circumstances. It is peace that exists despite them.\n\nThis is why Paul could write from prison with joy. Why missionaries in danger sang. Why believers through history could face impossible situations with composure.\n\nThis peace is not emotional numbness or forced positivity. It is a settled trust that God is present, that he is good, and that the ultimate outcome is secure. You can have this peace today — not by solving your problems, but by bringing them to the God who holds them.",
      actionSteps: [
        "Before you check your phone or start your morning tasks, take 5 minutes of quiet and read John 14:27 slowly three times.",
        "Identify one thing disturbing your peace this week. Physically write 'I give this to God' next to it.",
      ],
    },
  },

  gratitude: {
    topic: "gratitude",
    title: "Bible Verses for Gratitude",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for gratitude. Cultivate thankfulness through God's Word and transform your perspective on daily life.",
    intro:
      "Gratitude is one of the most frequently commanded responses in Scripture — and one of the most counter-cultural. In a world that defaults to scarcity and comparison, the Bible calls believers to a different way of seeing. Here are key verses on gratitude, a prayer, and a devotional.",
    verses: [
      {
        ref: "1 Thessalonians 5:18",
        text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
        context: "'In' all circumstances, not 'for' all circumstances — gratitude is possible in hard times, not contingent on them.",
      },
      {
        ref: "Psalm 100:4",
        text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
        context: "Gratitude as the posture of worship — thanksgiving is the entrance, not the conclusion.",
      },
      {
        ref: "Colossians 3:17",
        text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.",
        context: "Gratitude as a way of life — woven into everything, not reserved for special occasions.",
      },
      {
        ref: "Psalm 107:1",
        text: "Give thanks to the Lord, for he is good; his love endures forever.",
        context: "Gratitude rooted in God's character, not in current feelings — a stable foundation for thanksgiving.",
      },
      {
        ref: "Ephesians 5:20",
        text: "Always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.",
        context: "'Always' and 'everything' — Paul's standard for gratitude is remarkably high and unconditional.",
      },
    ],
    prayer:
      "Father, I want to thank you — specifically, not generally.\n\nThank you for [insert something specific]. Thank you for the people in my life who love me. Thank you for provision I may have taken for granted today: food, shelter, safety, health.\n\nI confess that comparison and discontentment have crowded out gratitude recently. Forgive me for focusing on what I lack instead of what you have given.\n\nHelp me to cultivate a grateful heart — not as a performance, but as a real reorientation of how I see my life. Let gratitude become my default, not my occasional feeling. Amen.",
    devotional: {
      title: "Gratitude as a Practice, Not a Feeling",
      reflection:
        "1 Thessalonians 5:18 says to 'give thanks in all circumstances' — not wait until you feel grateful. This is intentional. Gratitude in Scripture is often an act of will before it becomes a feeling.\n\nResearch in positive psychology confirms what Scripture has always said: deliberately practicing gratitude rewires perspective. People who regularly record specific things they're thankful for report higher wellbeing, lower anxiety, and stronger relationships.\n\nBut the biblical motive is different. We give thanks not primarily for our own mental health — but because God is good and his love endures forever. Gratitude is a response to reality, not a self-improvement technique.",
      actionSteps: [
        "Write down 5 specific things you are grateful for today — not generic blessings, but named people, moments, and gifts.",
        "Text or tell one person today something specific you appreciate about them.",
      ],
    },
  },

  faith: {
    topic: "faith",
    title: "Bible Verses for Faith",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for faith. Strengthen your trust in God through His Word when doubt or uncertainty arise.",
    intro:
      "Faith is not the absence of doubt — it is choosing to trust God in spite of it. Scripture defines faith, models it through extraordinary examples, and calls every believer into it as a daily practice. Here are key Bible verses on faith, a prayer for strengthened faith, and a devotional.",
    verses: [
      {
        ref: "Hebrews 11:1",
        text: "Now faith is confidence in what we hope for and assurance about what we do not see.",
        context: "The Bible's definition of faith — not certainty based on evidence, but confidence based on God's character and promises.",
      },
      {
        ref: "Romans 10:17",
        text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.",
        context: "Faith is grown through exposure to Scripture — the practical implication is that reading the Bible builds faith.",
      },
      {
        ref: "Mark 9:24",
        text: "Immediately the boy's father exclaimed: 'I do believe; help me overcome my unbelief!'",
        context: "One of the most honest prayers in the Gospels — faith and doubt coexisting, and Jesus responding to both.",
      },
      {
        ref: "James 2:17",
        text: "In the same way, faith by itself, if it is not accompanied by action, is dead.",
        context: "Faith is evidenced and strengthened by action — living as if what you believe is true.",
      },
      {
        ref: "2 Corinthians 5:7",
        text: "For we live by faith, not by sight.",
        context: "The daily orientation of the Christian life — making decisions based on God's promises, not only visible evidence.",
      },
    ],
    prayer:
      "Lord, I believe. Help my unbelief.\n\nThere are areas of my life where my faith feels thin — where the gap between what I confess and what I truly trust is wide. You know exactly what those areas are.\n\nThank you that faith is a gift, not a performance. Thank you that even faith the size of a mustard seed moves mountains in your hands.\n\nGrow my faith through your Word. Through answered prayer I can look back on. Through community with people who trust you deeply. Help me to act on what I believe, not just hold it as a belief.\n\nI trust you — and where I struggle to trust, I ask you to hold me. Amen.",
    devotional: {
      title: "Faith Is Not the Absence of Doubt",
      reflection:
        "Mark 9:24 contains one of the most remarkable exchanges in the Gospels. A desperate father says to Jesus: 'I believe; help me in my unbelief.' And Jesus heals his son anyway.\n\nFaith in Scripture is not certainty. It is directional trust — choosing to orient your life toward God even when questions remain. The father in Mark 9 was half-certain at best. Jesus responded to his reaching, not his theological confidence.\n\nIf your faith feels weak today, you are in good company. Elijah, Gideon, Thomas, and Peter all had moments of genuine doubt. What marked them was not perfect faith — it was returning to God in the doubt.",
      actionSteps: [
        "Write down one thing you are struggling to trust God with. Pray Mark 9:24 over it: 'I believe; help my unbelief.'",
        "Read Hebrews 11 in one sitting — the 'faith hall of fame.' Notice that every person listed also had moments of profound uncertainty.",
      ],
    },
  },

  "prayer-for-a-sick-parent": {
    topic: "prayer-for-a-sick-parent",
    label: "a Sick Parent",
    title: "A Prayer for a Sick Parent",
    description:
      "Bible verses, a heartfelt written prayer, and one small next step for when your mother or father is sick. Scripture-grounded comfort for worried adult children.",
    intro:
      "When a parent is sick, the person who once cared for you suddenly needs your care — and that reversal can leave you frightened, exhausted, and unsure how to pray. You don't need the perfect words tonight. Below are a few verses to steady you, a prayer you can pray at the bedside or from far away, and one small step you can take today.",
    verses: [
      {
        ref: "Psalm 41:3 (KJV)",
        text: "The LORD will strengthen him upon the bed of languishing: thou wilt make all his bed in his sickness.",
        context:
          "Picture God himself tending your parent's sickbed — this verse promises his nearness in the very place that frightens you most.",
      },
      {
        ref: "Isaiah 41:10 (WEB)",
        text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
        context:
          "Spoken to you, the worried child: God's promise to be with you is meant to steady your hands when you feel powerless to fix anything.",
      },
      {
        ref: "2 Corinthians 1:3–4 (WEB)",
        text: "Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction, that we may be able to comfort those who are in any affliction, through the comfort with which we ourselves are comforted by God.",
        context:
          "The comfort you receive from God is not only for you — it becomes the comfort you carry back into your parent's room.",
      },
      {
        ref: "Matthew 11:28 (WEB)",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        context:
          "Caregiving is heavy work; Jesus invites the weary child, not only the sick parent, to come to him and find rest.",
      },
    ],
    prayer:
      "Father, my mom (or dad) is sick, and I feel so small in front of it. You know every detail of this illness that I cannot control — the test results, the long nights, the fear I carry into their room. Thank you that you are already at the bedside, strengthening and sustaining them when I can't. Steady my own heart with your peace, and let me be a calm, loving presence instead of an anxious one. Whether you bring healing in this life or carry them gently home to you, help us both to trust that they are held in hands kinder and stronger than mine. Give me strength for today, and the grace to love them well in the time we have. Amen.",
    actionStep:
      "Before today gets away from you, do one small thing: sit with your parent for ten unhurried minutes — no phone, no agenda — and read Psalm 41:3 aloud over them. If you live far away, send a short voice note telling them you love them and that you prayed for them today.",
    prayerCta: {
      text: "Need a prayer for your exact situation? Tell Faith Companion what you're going through — their diagnosis, your fears, the words you can't find — and get a personal prayer written for this moment.",
      buttonLabel: "Write a prayer for my situation",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
    ],
  },

  "prayer-before-surgery": {
    topic: "prayer-before-surgery",
    label: "Surgery",
    title: "A Prayer Before Surgery",
    description:
      "Bible verses, a written prayer, and a calming next step to pray before surgery — for yourself or someone you love. Scripture-grounded peace before an operation.",
    intro:
      "The night before surgery is often the hardest part — the waiting, the what-ifs, the loss of control. Whether you're the one going under or you're pacing a waiting room for someone you love, God is not absent from the operating room. Here are a few verses to steady you, a prayer for before the procedure, and one small thing you can do tonight.",
    verses: [
      {
        ref: "Psalm 56:3 (WEB)",
        text: "When I am afraid, I will put my trust in you.",
        context:
          "A short, honest sentence you can pray on the gurney itself, the moment fear spikes.",
      },
      {
        ref: "Psalm 23:4 (WEB)",
        text: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.",
        context:
          "The promise is not that you skip the valley, but that you are never alone in it.",
      },
      {
        ref: "Proverbs 3:5–6 (KJV)",
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        context:
          "You don't have to understand the medicine or control the outcome — only entrust both to God.",
      },
      {
        ref: "Psalm 91:1–2 (KJV)",
        text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
        context:
          "A shelter to return to again and again through the long hours of waiting.",
      },
    ],
    prayer:
      "Father, surgery is coming, and I feel the weight of everything I cannot control. You know the fear sitting in my chest tonight — the unknowns, the waiting, the what-ifs I keep turning over. Thank you that you will be in that operating room when I cannot be, steadying the hands of every doctor and nurse and watching over every moment. Quiet my racing thoughts and give me the kind of peace that does not depend on knowing the outcome. Whatever the result, help me to trust that I am held by a God who is good and who never leaves. Into your hands I place this body, this day, and the people I love. Amen.",
    actionStep:
      "Tonight, before you try to sleep, write the one thing you're most afraid of on a slip of paper, pray Psalm 56:3 over it — \"When I am afraid, I will put my trust in you\" — and leave the paper where you'll see it in the morning. If you're waiting on a loved one's surgery, send them one short message tonight telling them you're praying.",
    prayerCta: {
      text: "Facing a specific procedure or waiting on someone in surgery? Tell Faith Companion the details and get a personal prayer written for this exact moment.",
      buttonLabel: "Write a prayer for surgery",
    },
    related: [
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
    ],
  },

  "bible-verses-for-grief": {
    topic: "bible-verses-for-grief",
    label: "Grief",
    title: "Bible Verses for Grief",
    description:
      "Comforting Bible verses, a written prayer, and a gentle next step for grief and loss. Scripture-grounded comfort for the brokenhearted when you're mourning someone you love.",
    intro:
      "Grief doesn't move in a straight line, and there's no timeline you're failing to keep. Whether the loss is fresh or you've been carrying it quietly for months, Scripture doesn't rush you or tidy your sorrow — it sits with you in it. Here are verses for the brokenhearted, a prayer for when words run out, and one small thing for today.",
    verses: [
      {
        ref: "Psalm 34:18 (KJV)",
        text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
        context:
          "God draws nearest, not farthest, in the moments your heart is most broken.",
      },
      {
        ref: "Matthew 5:4 (WEB)",
        text: "Blessed are those who mourn, for they shall be comforted.",
        context:
          "Jesus calls mourning blessed — your tears are not a failure of faith but a doorway to comfort.",
      },
      {
        ref: "Revelation 21:4 (WEB)",
        text: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more, for the first things have passed away.",
        context:
          "A promise that grief is real now but not forever — God himself will one day undo it.",
      },
      {
        ref: "Psalm 147:3 (WEB)",
        text: "He heals the broken in heart, and binds up their wounds.",
        context:
          "Healing from loss is slow, tender work, and God does it like a physician binding a wound.",
      },
    ],
    prayer:
      "Father, I am grieving, and some days the weight of it is almost more than I can carry. You know who I've lost and the exact shape of this empty space — the conversations that won't happen, the ordinary moments I keep reaching for out of habit. Thank you that you are near to the brokenhearted and that you keep track of every one of my tears. Comfort me in the places no one else can reach, and don't let me feel ashamed of how long this is taking. Hold the hope in front of me that death does not get the final word, and that what is hidden in you is never truly lost. Until that day, be my comfort and my strength, one ordinary morning at a time. Amen.",
    actionStep:
      "Don't carry it silently today — say the name of the person you lost out loud to God, and tell him honestly how you're doing, even if all you can manage is \"this hurts.\" Then read Psalm 34:18 slowly, and let yourself believe he is near.",
    prayerCta: {
      text: "Grieving a specific loss? Tell Faith Companion who you're missing and get a gentle, personal prayer written for exactly where you are today.",
      buttonLabel: "Write a prayer for my grief",
    },
    related: [
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
    ],
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS);

export function getTopic(slug: string): TopicData | undefined {
  return TOPICS[slug];
}
