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
        ref: "Philippians 4:6–7 (WEB)",
        text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
        context: "Paul wrote this from prison — a reminder that peace is possible in the worst circumstances, not just comfortable ones.",
      },
      {
        ref: "Matthew 6:34 (WEB)",
        text: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own evil is sufficient.",
        context: "Jesus teaches here that anxiety is often about projecting future problems. He invites us back to the present.",
      },
      {
        ref: "Isaiah 41:10 (WEB)",
        text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
        context: "God's direct word of reassurance. This verse has been a lifeline for believers in crisis for 2,700 years.",
      },
      {
        ref: "1 Peter 5:7 (KJV)",
        text: "Casting all your care upon him; for he careth for you.",
        context: "The image is of physically throwing a burden onto God — an active, decisive release of worry.",
      },
      {
        ref: "Psalm 94:19 (WEB)",
        text: "In the multitude of my thoughts within me, your comforts delight my soul.",
        context: "When anxious thoughts multiply and crowd in, God's comfort is what steadies and delights the soul.",
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
      "Biblical hope is not wishful thinking — it is confident expectation rooted in the character of God. When circumstances are bleak and the future feels unclear, Scripture gives hope something solid to stand on. Here are key Bible verses about hope, a short reflection, a prayer for renewed hope, and one small step.",
    verses: [
      {
        ref: "Jeremiah 29:11 (KJV)",
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        context: "Spoken to Israelites in exile — people whose situation looked hopeless. God's plans operate on a longer timeline than ours.",
      },
      {
        ref: "Romans 15:13 (KJV)",
        text: "Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.",
        context: "Hope is not generated by willpower — it is a gift of the Spirit given to those who trust.",
      },
      {
        ref: "Romans 8:24–25 (KJV)",
        text: "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for? But if we hope for that we see not, then do we with patience wait for it.",
        context: "Paul connects hope directly to salvation — and defines it as waiting with patience for what is not yet visible.",
      },
      {
        ref: "Psalm 31:24 (KJV)",
        text: "Be of good courage, and he shall strengthen your heart, all ye that hope in the LORD.",
        context: "Hope in God is not passive resignation — it is an active, strengthening force.",
      },
      {
        ref: "Lamentations 3:22–23 (KJV)",
        text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
        context: "Written in the darkest period of Israel's history — yet here is one of Scripture's greatest declarations of hope.",
      },
    ],
    prayer:
      "Father God, I come to you when hope feels thin. Circumstances have worn me down, and it is hard to see a future that looks different from today.\n\nYour Word says you are the God of hope — that you fill your people with joy and peace as they trust you. I want to trust you. Help me where my trust falls short.\n\nThank you that your mercies are new every morning. Even when I cannot see the path forward, your faithfulness has not changed.\n\nFill me with hope that doesn't depend on circumstances. Let the Holy Spirit renew my expectation that you are at work, even now, even here. Amen.",
    reflection:
      "Real hope is tested in difficulty, not confirmed by it. The hope Paul writes about in Romans 8 is not the hope of good circumstances — it is the hope of resurrection, of a God who reverses death itself.\n\nThis kind of hope changes how you live while you wait. You can act with courage, extend grace to others, and face hard days without being destroyed — because you know how the story ends.\n\nIf your hope feels thin today, it may simply need feeding. Hope grows through Scripture, through prayer, and through remembering what God has already done.",
    actionStep:
      "Write down three things God has already done in your life that once required hope — then, when this season feels hopeless, read the list back as evidence. Sit with Romans 8 and the phrase \"with patience wait for it,\" naming what you are waiting for now.",
    prayerCta: {
      text: "Holding onto hope in a specific situation? Tell Faith Companion what feels hopeless right now and get a hope-filled, Scripture-based prayer written for it.",
      buttonLabel: "Write a prayer for hope",
    },
    related: [
      { slug: "faith", label: "Bible Verses for Faith" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  strength: {
    topic: "strength",
    title: "Bible Verses About Strength",
    description:
      "Bible verses about strength, a written prayer, and one small next step for when you feel weak or worn down. Find God's strength to endure in his Word.",
    intro:
      "Everyone reaches points of exhaustion — physically, emotionally, and spiritually. Scripture doesn't minimize this. It meets you in weakness and points to a strength that is not your own. Here are Bible verses about strength, a prayer for when you're running on empty, and one small step.",
    verses: [
      {
        ref: "Isaiah 40:31 (KJV)",
        text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
        context: "One of the most beloved promises in Scripture — strength that is renewed by waiting on God, not by working harder.",
      },
      {
        ref: "Philippians 4:13 (KJV)",
        text: "I can do all things through Christ which strengtheneth me.",
        context: "Often misquoted as unlimited capability — in context, Paul is speaking of contentment and endurance in hardship through Christ.",
      },
      {
        ref: "2 Corinthians 12:9 (KJV)",
        text: "And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.",
        context: "Paul's thorn in the flesh — God's answer was not removal of weakness, but grace that is enough within it.",
      },
      {
        ref: "Psalm 46:1 (KJV)",
        text: "God is our refuge and strength, a very present help in trouble.",
        context: "This psalm was likely written during a military threat — strength found not in weapons but in God's presence.",
      },
      {
        ref: "Joshua 1:9 (KJV)",
        text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
        context: "God's command to Joshua as he faced an impossible task. The same word applies to any impossible situation you face.",
      },
    ],
    reflection:
      "Isaiah 40:31 ties renewed strength to hope in God — not to effort, not to willpower, not to better strategies. The Hebrew word for 'renew' literally means 'to exchange' — as if you hand God your depleted strength and receive his in return.\n\nThis kind of strength is counterintuitive. It comes in the moments you admit you don't have it. It grows in the spaces between striving — in stillness, in prayer, in honest surrender.\n\nIf you are exhausted today, the invitation is not to push harder. It is to wait on the God who renews.",
    prayer:
      "Lord, I am tired. The kind of tired that sleep doesn't fully fix. I've been pushing through, and I'm running out of my own strength.\n\nYour Word says those who hope in you will renew their strength. I am choosing to hope in you today — even when I don't feel it, even when I can't see how things will improve.\n\nThank you that your power is made perfect in weakness. That means my limits are not a problem for you. Help me to stop straining in my own effort and to rest in yours.\n\nGive me the strength to do what today requires — and nothing more. I trust you with the rest. Amen.",
    actionStep:
      "Name one thing you've been carrying in your own strength, and pray it over to God out loud today. Then rest deliberately — take fifteen unproductive minutes and invite God into them instead of pushing harder.",
    prayerCta: {
      text: "Running on empty in a specific situation? Tell Faith Companion what's draining you and get a strengthening, Scripture-based prayer written for your exact moment.",
      buttonLabel: "Write a prayer for strength",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "healing", label: "Prayer for Healing" },
    ],
  },

  healing: {
    topic: "healing",
    title: "Healing Scriptures: Prayer for Healing",
    description:
      "Healing scriptures, a written prayer for healing, and one small next step. Whether the wound is physical, emotional, or spiritual, find God's comfort and restoration in his Word.",
    intro:
      "Healing in Scripture covers far more than physical restoration. It includes emotional wholeness, forgiveness of sin, relational repair, and spiritual renewal. Here are healing scriptures for every kind of brokenness, a prayer for healing you can pray today, and one small step to take.",
    verses: [
      {
        ref: "Isaiah 53:5 (KJV)",
        text: "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
        context: "The foundational healing verse in Scripture — spiritual healing through Christ's sacrifice, with implications for all dimensions of healing.",
      },
      {
        ref: "Jeremiah 30:17 (KJV)",
        text: "For I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.",
        context: "God's promise to restore — healing is part of his heart toward his people, not an afterthought.",
      },
      {
        ref: "Jeremiah 17:14 (KJV)",
        text: "Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.",
        context: "A direct, honest prayer for healing — Scripture itself teaches us it's appropriate to ask God for healing.",
      },
      {
        ref: "James 5:14–15 (KJV)",
        text: "Is any sick among you? let him call for the elders of the church; and let them pray over him, anointing him with oil in the name of the Lord: And the prayer of faith shall save the sick, and the Lord shall raise him up.",
        context: "Healing through community and prayer — God often works healing through the body of believers.",
      },
      {
        ref: "Psalm 103:2–3 (KJV)",
        text: "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",
        context: "Healing positioned alongside forgiveness — both are the work of the same God who restores.",
      },
    ],
    reflection:
      "The Bible's vision of healing is broader than the medical model. Jesus healed bodies, but he also healed shame (the woman at the well), isolation (the lepers), fear (the disciples in the storm), and grief (Mary at Lazarus's tomb).\n\nHealing in Scripture is always moving toward wholeness — shalom. The Hebrew word means peace, completeness, nothing missing. This kind of healing is available even when physical circumstances don't change.\n\nBring whatever is broken to the God who heals. He may move quickly or slowly. But he moves — and the first movement is always toward you.",
    prayer:
      "Father, I come to you in need of healing — [for my body / for my heart / for this wound I carry]. You know the exact nature of what needs to be made whole. I don't need to explain it fully.\n\nYour Word says you heal the brokenhearted and bind up their wounds. You are the Lord who heals. I believe that. Help me where my belief falls short.\n\nI ask for your healing touch — in whatever form and timeline you choose. I trust that your ways are higher than mine.\n\nAnd while I wait, give me peace in the waiting. Let your presence itself be the first layer of healing, even before circumstances change. Amen.",
    actionStep:
      "Name the one thing you most need healing in — physical, emotional, or spiritual — and pray Jeremiah 17:14 over it: \"Heal me, O LORD, and I shall be healed.\" Then ask one person you trust to pray with you this week.",
    prayerCta: {
      text: "Carrying something specific that needs healing? Tell Faith Companion what you're walking through and get a personal prayer for healing written for your exact situation.",
      buttonLabel: "Write a prayer for healing",
    },
    related: [
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  forgiveness: {
    topic: "forgiveness",
    title: "What the Bible Says About Forgiveness",
    description:
      "What does the Bible say about forgiveness? Key verses, a written prayer, and one small step — to receive God's forgiveness and find the freedom to forgive others.",
    intro:
      "Forgiveness is one of the most transformative — and most difficult — acts in the Christian life. Scripture speaks to both receiving forgiveness from God and extending it to others. Here is what the Bible says about forgiveness — key verses, a prayer, and one small step toward freedom.",
    verses: [
      {
        ref: "1 John 1:9 (KJV)",
        text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",
        context: "A direct promise: confession leads to forgiveness. Not based on our worthiness but on God's faithfulness.",
      },
      {
        ref: "Ephesians 4:32 (KJV)",
        text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you.",
        context: "The standard for forgiving others is God's forgiveness of us — not what others deserve.",
      },
      {
        ref: "Psalm 103:12 (KJV)",
        text: "As far as the east is from the west, so far hath he removed our transgressions from us.",
        context: "A spatial metaphor for total removal — east and west never meet; God's forgiveness is complete.",
      },
      {
        ref: "Isaiah 43:25 (KJV)",
        text: "I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins.",
        context: "God's forgiveness is so thorough that he chooses not to remember — a profound act of divine mercy.",
      },
      {
        ref: "Colossians 3:13 (KJV)",
        text: "Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.",
        context: "Forgiving others is presented as normal Christian life — not an extraordinary achievement.",
      },
    ],
    reflection:
      "One of the greatest obstacles to forgiving others is the belief that forgiveness means pretending it didn't happen — minimizing the pain or restoring trust automatically. It doesn't.\n\nBiblical forgiveness is releasing the debt, not denying the damage. It is choosing to stop keeping score, not because the offense doesn't matter, but because you are releasing the outcome to God.\n\nReceiving God's forgiveness works the same way. You don't earn it by minimizing your failures. You receive it by confessing them and trusting that Christ's work is enough. It is.",
    prayer:
      "Father, I need your forgiveness. I have done things I regret — said words, made choices, harbored attitudes that are not what you call me to. I confess them to you now.\n\nYour Word promises that if I confess, you are faithful and just to forgive. I receive that forgiveness today. Thank you that my failures are not held against me in Christ.\n\nI also ask for help forgiving [name/situation]. The hurt is real, and I can't manufacture forgiveness on my own. Give me your heart toward them — not a dismissal of the wrong, but a release of the debt.\n\nFree me from both the guilt of what I've done and the bitterness of what has been done to me. Amen.",
    actionStep:
      "Write down one thing you feel guilty about, pray 1 John 1:9 over it, and write \"Forgiven\" across it. Then name one person you're struggling to forgive and ask God to bless them today — before you feel ready to.",
    prayerCta: {
      text: "Wrestling with guilt, or someone you can't seem to forgive? Tell Faith Companion the situation and get a personal, Scripture-based prayer written for it.",
      buttonLabel: "Write a prayer for forgiveness",
    },
    related: [
      { slug: "prayer-for-a-struggling-marriage", label: "A Prayer for a Struggling Marriage" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
    ],
  },

  peace: {
    topic: "peace",
    title: "A Prayer for Peace in Stressful Times",
    description:
      "A prayer for peace in a stressful time, calming Bible verses, and one small step. Find the peace that passes understanding when life feels overwhelming.",
    intro:
      "The peace God offers is unlike anything the world provides. It doesn't depend on circumstances being right or resolved. It is a settled confidence that God is present and in control. Here are calming Bible verses, a prayer for peace in a stressful time, and one small step toward stillness.",
    verses: [
      {
        ref: "John 14:27 (KJV)",
        text: "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.",
        context: "Jesus speaks this to his disciples hours before his arrest — peace given in the most turbulent possible moment.",
      },
      {
        ref: "Philippians 4:6–7 (KJV)",
        text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",
        context: "Peace as a guard — active and protective. It does not make sense to observers but it is real.",
      },
      {
        ref: "Isaiah 26:3 (KJV)",
        text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",
        context: "'Perfect peace' in Hebrew is shalom shalom — doubled for emphasis. Available to those whose minds are fixed on God.",
      },
      {
        ref: "Romans 5:1 (KJV)",
        text: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ.",
        context: "The ultimate peace — restored relationship with God. This is the foundation all other peace rests on.",
      },
      {
        ref: "Psalm 4:8 (KJV)",
        text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.",
        context: "A prayer before sleep — trusting God with the night and the uncertainty of tomorrow.",
      },
    ],
    reflection:
      "Philippians 4:7 describes God's peace as something that 'passeth all understanding.' This is not peace that makes sense given the circumstances. It is peace that exists despite them.\n\nThis is why Paul could write from prison with joy. Why missionaries in danger sang. Why believers through history could face impossible situations with composure.\n\nThis peace is not emotional numbness or forced positivity. It is a settled trust that God is present, that he is good, and that the ultimate outcome is secure. You can have this peace today — not by solving your problems, but by bringing them to the God who holds them.",
    prayer:
      "Lord Jesus, you promised a peace the world cannot give — a peace that goes beyond understanding. I need that peace today.\n\nMy mind keeps returning to [the problem / the uncertainty / the conflict]. I can't seem to let it rest.\n\nHelp me to bring every anxious thought captive to you. Guard my heart and my mind. Settle me in a way I cannot manufacture on my own.\n\nThank you that I have peace with God through Christ. Help me to live from that foundation today. Let your peace rule in my heart, and let it overflow into how I treat the people around me. Amen.",
    actionStep:
      "Before you reach for your phone tomorrow morning, take five quiet minutes and read John 14:27 slowly three times. Then name the one thing most disturbing your peace and write beside it: \"I give this to God.\"",
    prayerCta: {
      text: "Stressed about something specific right now? Tell Faith Companion what's stealing your peace and get a calming, Scripture-based prayer written for this moment.",
      buttonLabel: "Write a prayer for peace",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-when-you-cant-sleep", label: "Verses for When You Can't Sleep" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  gratitude: {
    topic: "gratitude",
    title: "A Prayer for Gratitude",
    description:
      "A prayer for gratitude, Bible verses on thankfulness, and one small step. Cultivate a grateful heart and reorient how you see your life through God's Word.",
    intro:
      "Gratitude is one of the most frequently commanded responses in Scripture — and one of the most counter-cultural. In a world that defaults to scarcity and comparison, the Bible calls believers to a different way of seeing. Here are verses on thankfulness, a prayer for gratitude, and one small step to practice it today.",
    verses: [
      {
        ref: "1 Thessalonians 5:18 (KJV)",
        text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",
        context: "'In' every thing, not 'for' every thing — gratitude is possible in hard times, not contingent on them.",
      },
      {
        ref: "Psalm 100:4 (KJV)",
        text: "Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",
        context: "Gratitude as the posture of worship — thanksgiving is the entrance, not the conclusion.",
      },
      {
        ref: "Colossians 3:17 (KJV)",
        text: "And whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks to God and the Father by him.",
        context: "Gratitude as a way of life — woven into everything, not reserved for special occasions.",
      },
      {
        ref: "Psalm 107:1 (KJV)",
        text: "O give thanks unto the LORD, for he is good: for his mercy endureth for ever.",
        context: "Gratitude rooted in God's character, not in current feelings — a stable foundation for thanksgiving.",
      },
      {
        ref: "Ephesians 5:20 (KJV)",
        text: "Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ.",
        context: "'Always' and 'all things' — Paul's standard for gratitude is remarkably high and unconditional.",
      },
    ],
    reflection:
      "1 Thessalonians 5:18 says to 'give thanks in every thing' — not wait until you feel grateful. This is intentional. Gratitude in Scripture is often an act of will before it becomes a feeling.\n\nResearch in positive psychology confirms what Scripture has always said: deliberately practicing gratitude rewires perspective. People who regularly record specific things they're thankful for report higher wellbeing, lower anxiety, and stronger relationships.\n\nBut the biblical motive is different. We give thanks not primarily for our own mental health — but because God is good and his mercy endures forever. Gratitude is a response to reality, not a self-improvement technique.",
    prayer:
      "Father, I want to thank you — specifically, not generally.\n\nThank you for [insert something specific]. Thank you for the people in my life who love me. Thank you for provision I may have taken for granted today: food, shelter, safety, health.\n\nI confess that comparison and discontentment have crowded out gratitude recently. Forgive me for focusing on what I lack instead of what you have given.\n\nHelp me to cultivate a grateful heart — not as a performance, but as a real reorientation of how I see my life. Let gratitude become my default, not my occasional feeling. Amen.",
    actionStep:
      "Write down five specific things you're grateful for today — named people, moments, and gifts, not generic blessings. Then tell one of those people, out loud or in a message, exactly what you appreciate about them.",
    prayerCta: {
      text: "Want to thank God for something specific? Tell Faith Companion what's on your heart and get a personal prayer of gratitude written for this moment.",
      buttonLabel: "Write a prayer of gratitude",
    },
    related: [
      { slug: "prayer-for-financial-provision", label: "A Prayer for Financial Provision" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  faith: {
    topic: "faith",
    title: "Bible Verses for Faith",
    description:
      "Scripture-based verses, a personal prayer, and a devotional for faith. Strengthen your trust in God through His Word when doubt or uncertainty arise.",
    intro:
      "Faith is not the absence of doubt — it is choosing to trust God in spite of it. Scripture defines faith, models it through extraordinary examples, and calls every believer into it as a daily practice. Here are key Bible verses on faith, a short reflection, a prayer for strengthened faith, and one small step.",
    verses: [
      {
        ref: "Hebrews 11:1 (KJV)",
        text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
        context: "The Bible's definition of faith — not certainty based on evidence, but confidence based on God's character and promises.",
      },
      {
        ref: "Romans 10:17 (KJV)",
        text: "So then faith cometh by hearing, and hearing by the word of God.",
        context: "Faith is grown through exposure to Scripture — the practical implication is that reading the Bible builds faith.",
      },
      {
        ref: "Mark 9:24 (KJV)",
        text: "And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief.",
        context: "One of the most honest prayers in the Gospels — faith and doubt coexisting, and Jesus responding to both.",
      },
      {
        ref: "James 2:17 (KJV)",
        text: "Even so faith, if it hath not works, is dead, being alone.",
        context: "Faith is evidenced and strengthened by action — living as if what you believe is true.",
      },
      {
        ref: "2 Corinthians 5:7 (KJV)",
        text: "For we walk by faith, not by sight.",
        context: "The daily orientation of the Christian life — making decisions based on God's promises, not only visible evidence.",
      },
    ],
    prayer:
      "Lord, I believe. Help my unbelief.\n\nThere are areas of my life where my faith feels thin — where the gap between what I confess and what I truly trust is wide. You know exactly what those areas are.\n\nThank you that faith is a gift, not a performance. Thank you that even faith the size of a mustard seed moves mountains in your hands.\n\nGrow my faith through your Word. Through answered prayer I can look back on. Through community with people who trust you deeply. Help me to act on what I believe, not just hold it as a belief.\n\nI trust you — and where I struggle to trust, I ask you to hold me. Amen.",
    reflection:
      "Mark 9:24 contains one of the most remarkable exchanges in the Gospels. A desperate father says to Jesus: 'Lord, I believe; help thou mine unbelief.' And Jesus heals his son anyway.\n\nFaith in Scripture is not certainty. It is directional trust — choosing to orient your life toward God even when questions remain. The father in Mark 9 was half-certain at best. Jesus responded to his reaching, not his theological confidence.\n\nIf your faith feels weak today, you are in good company. Elijah, Gideon, Thomas, and Peter all had moments of genuine doubt. What marked them was not perfect faith — it was returning to God in the doubt.",
    actionStep:
      "Write down one thing you're struggling to trust God with, and pray Mark 9:24 over it — \"Lord, I believe; help thou mine unbelief.\" Then read Hebrews 11 in one sitting and notice that every person in faith's \"hall of fame\" also had seasons of real uncertainty.",
    prayerCta: {
      text: "Wrestling with doubt about something specific? Tell Faith Companion where your faith feels thin and get a personal, Scripture-based prayer written for it.",
      buttonLabel: "Write a prayer for faith",
    },
    related: [
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
    ],
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

  "prayer-for-a-job-interview": {
    topic: "prayer-for-a-job-interview",
    label: "a Job Interview",
    title: "A Prayer for a Job Interview",
    description:
      "A prayer for a job interview, with calming Bible verses and one practical next step. Walk in with peace and confidence, trusting God with the outcome.",
    intro:
      "The morning of an interview can tie your stomach in knots — the rehearsing, the comparing, the weight you've put on this one conversation. Whether you need this job badly or you're just nervous about being judged, God already knows the desire of your heart and the door he is preparing. Here are a few verses to settle you, a prayer for before you walk in, and one small thing to do beforehand.",
    verses: [
      {
        ref: "Proverbs 16:3 (KJV)",
        text: "Commit thy works unto the LORD, and thy thoughts shall be established.",
        context: "Hand God the outcome and let your racing thoughts settle into steadiness.",
      },
      {
        ref: "Colossians 3:23 (KJV)",
        text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
        context: "It frees you to do your honest best as worship, instead of performing for human approval.",
      },
      {
        ref: "Jeremiah 29:11 (KJV)",
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        context: "Your career is held inside God's good plans, even when one interview feels make-or-break.",
      },
      {
        ref: "Isaiah 41:13 (KJV)",
        text: "For I the LORD thy God will hold thy right hand, saying unto thee, Fear not; I will help thee.",
        context: "Picture God holding your hand as you walk in — you are not facing this alone.",
      },
    ],
    prayer:
      "Father, my interview is almost here, and I can feel the nerves rising. You know how much I want this, and you know what I actually need even better than I do. Steady my mind so I can think clearly, calm my body, and help me to speak honestly about who I am and what I can offer. Help me to do my best as something offered to you, and then to release the result into your hands. Whether this door opens or closes, I trust that you are guiding me toward the place you have for me. Thank you that my worth was never riding on this anyway — it is already secure in you. Amen.",
    actionStep:
      "Five minutes before you walk in, step aside, breathe slowly, and pray Proverbs 16:3 over the interview — \"Commit thy works unto the LORD\" — handing him both your preparation and the outcome. Then walk in as yourself, not a performance.",
    prayerCta: {
      text: "Got an interview coming up for a specific role? Tell Faith Companion about it and get a personal prayer written for the day.",
      buttonLabel: "Write a prayer for my interview",
    },
    related: [
      { slug: "prayer-for-financial-provision", label: "A Prayer for Financial Provision" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  "prayer-for-financial-provision": {
    topic: "prayer-for-financial-provision",
    label: "Financial Provision",
    title: "A Prayer for Financial Provision",
    description:
      "A prayer for financial provision, Bible verses on God's provision, and one practical next step. Bring your money worries to the God who feeds the sparrows.",
    intro:
      "Money stress has a way of seeping into everything — the lying-awake math, the dread when a bill arrives, the shame of not being where you hoped you'd be. God is not distant from your bank account, and he is not disappointed in you for struggling. Here are verses about his provision, a prayer for when the numbers don't add up, and one practical step for today.",
    verses: [
      {
        ref: "Matthew 6:33 (KJV)",
        text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        context: "Provision follows trust — seek God first and let him carry the rest.",
      },
      {
        ref: "Philippians 4:19 (KJV)",
        text: "But my God shall supply all your need according to his riches in glory by Christ Jesus.",
        context: "Your need is measured against God's riches, not your account balance.",
      },
      {
        ref: "Matthew 6:26 (KJV)",
        text: "Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?",
        context: "The God who feeds the birds has not forgotten you.",
      },
      {
        ref: "Psalm 37:25 (KJV)",
        text: "I have been young, and now am old; yet have I not seen the righteous forsaken, nor his seed begging bread.",
        context: "A long life's testimony that God does not abandon his people to ruin.",
      },
    ],
    prayer:
      "Father, the numbers are not adding up, and the worry follows me into the night. You know exactly what I owe, what I lack, and what I'm afraid of. Thank you that you have promised to supply my needs out of your riches, and that you feed the birds without them earning a thing. Provide what we need, give me wisdom with what I already have, and quiet the panic that tells me it's all on me. Help me to seek you first and to trust that you will not let me be forsaken. Into your hands I place this need, and my pride along with it. Amen.",
    actionStep:
      "Write down the single number that scares you most, then under it write Philippians 4:19 — \"My God shall supply all your need.\" Then take one practical step today: one honest conversation, one small payment, one budget line — and leave the rest with him.",
    prayerCta: {
      text: "Facing a specific bill, debt, or shortfall? Tell Faith Companion what you're up against and get a personal prayer for provision written for your situation.",
      buttonLabel: "Write a prayer for provision",
    },
    related: [
      { slug: "prayer-for-a-job-interview", label: "A Prayer for a Job Interview" },
      { slug: "gratitude", label: "A Prayer for Gratitude" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
    ],
  },

  "bible-verses-for-when-you-cant-sleep": {
    topic: "bible-verses-for-when-you-cant-sleep",
    label: "When You Can't Sleep",
    title: "Bible Verses for When You Can't Sleep",
    description:
      "Calming Bible verses for when you can't sleep, a prayer for a restless mind, and one small step. Quiet anxious thoughts and rest in God through the night.",
    intro:
      "It's late, the house is quiet, and your mind won't stop — replaying the day, rehearsing tomorrow, spinning worst cases. If you're reading this at 3 a.m., you're not alone, and God is awake with you. Here are verses to steady your thoughts, a prayer for a restless mind, and one small thing to do before you try again to sleep.",
    verses: [
      {
        ref: "Psalm 127:2 (KJV)",
        text: "It is vain for you to rise up early, to sit up late, to eat the bread of sorrows: for so he giveth his beloved sleep.",
        context: "Rest is a gift God gives, not a prize you earn by staying anxious.",
      },
      {
        ref: "Psalm 121:3–4 (KJV)",
        text: "He will not suffer thy foot to be moved: he that keepeth thee will not slumber. Behold, he that keepeth Israel shall neither slumber nor sleep.",
        context: "You can finally close your eyes because the One watching over you never does.",
      },
      {
        ref: "Proverbs 3:24 (KJV)",
        text: "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet.",
        context: "A promise for the very moment you lie down — sweet sleep, not dread.",
      },
      {
        ref: "Psalm 91:5 (KJV)",
        text: "Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day.",
        context: "Night fears lose their grip under the shelter of God.",
      },
    ],
    prayer:
      "Father, it's late and I'm still awake, and the harder I try to sleep the louder my mind gets. You see the worries I keep turning over and the tomorrow I can't control tonight. Thank you that you never slumber, that you are keeping watch over everything I love even now. Quiet my racing thoughts, loosen the grip of every fear, and remind me that rest is a gift you give your beloved, not something I have to earn. Help me to hand you the day that's ending and the one that's coming, and to lie down without fear. Give me, even now, the sweet sleep you promise. Amen.",
    actionStep:
      "Instead of reaching for your phone, breathe slowly and pray Psalm 121 back to God — \"He that keepeth me will not slumber\" — naming each worry as you exhale it. If your mind keeps racing, keep a notepad by the bed and write tomorrow's worries down to hand to God until morning.",
    prayerCta: {
      text: "Lying awake with something specific on your mind? Tell Faith Companion what's keeping you up and get a calming prayer written for tonight.",
      buttonLabel: "Write a prayer for rest",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "prayer-for-financial-provision", label: "A Prayer for Financial Provision" },
    ],
  },

  "prayer-for-a-struggling-marriage": {
    topic: "prayer-for-a-struggling-marriage",
    label: "a Struggling Marriage",
    title: "A Prayer for a Struggling Marriage",
    description:
      "A prayer for a struggling marriage, with Bible verses on love and one gentle next step. Bring the distance, hurt, or weariness in your marriage to God.",
    intro:
      "Some seasons of marriage feel less like partnership and more like two people surviving in the same house — the distance, the repeated arguments, the love that feels buried under exhaustion and hurt. If your marriage is straining right now, you don't have to have it figured out to bring it to God. Here are verses to hold onto, a prayer for a hard season, and one small step toward each other.",
    verses: [
      {
        ref: "1 Corinthians 13:4–5 (KJV)",
        text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil.",
        context: "Love is described as a daily practice of patience, not a feeling — a place to start again.",
      },
      {
        ref: "Ecclesiastes 4:9–10 (KJV)",
        text: "Two are better than one; because they have a good reward for their labour. For if they fall, the one will lift up his fellow: but woe to him that is alone when he falleth.",
        context: "Marriage was meant to be two lifting each other — even now, in the falling.",
      },
      {
        ref: "Ephesians 4:2–3 (KJV)",
        text: "With all lowliness and meekness, with longsuffering, forbearing one another in love; endeavouring to keep the unity of the Spirit in the bond of peace.",
        context: "Unity is something you keep with effort and forbearance, especially when it's hard.",
      },
      {
        ref: "1 Peter 4:8 (KJV)",
        text: "And above all things have fervent charity among yourselves: for charity shall cover the multitude of sins.",
        context: "Love that keeps showing up can cover a long history of wrongs on both sides.",
      },
    ],
    prayer:
      "Father, my marriage is hard right now, and some days I don't know how to bridge the distance between us. You know every word that's been said and every hurt we're both carrying. Soften my heart where it has gone hard, and give me the patience that love requires when I feel I have none left. Where there is bitterness, bring forgiveness; where there is silence, open a way back to each other. Heal what we cannot heal on our own, and remind us both why we started. And if I can only change one person tonight, Lord, start with me. Amen.",
    actionStep:
      "Before you rehearse your spouse's faults again, pray 1 Corinthians 13 over yourself first — asking God where you can be more patient and kind this week. Then take one small step toward them today: a genuine thank-you, an apology, or simply sitting in the same room without your phone.",
    prayerCta: {
      text: "Walking through a specific struggle in your marriage? Tell Faith Companion what's going on and get a personal, Scripture-based prayer written for your situation.",
      buttonLabel: "Write a prayer for my marriage",
    },
    related: [
      { slug: "forgiveness", label: "What the Bible Says About Forgiveness" },
      { slug: "prayer-for-a-prodigal-child", label: "A Prayer for a Prodigal Child" },
      { slug: "peace", label: "A Prayer for Peace" },
    ],
  },

  "prayer-for-a-prodigal-child": {
    topic: "prayer-for-a-prodigal-child",
    label: "a Prodigal Child",
    title: "A Prayer for a Prodigal Child",
    description:
      "A prayer for a prodigal child who has wandered from God, with Bible verses of hope and one next step for waiting, praying parents.",
    intro:
      "Watching a child walk away — from God, from the values you raised them with, from you — is a particular kind of heartbreak that doesn't lift with time. You replay what you could have done differently, and you pray the same prayers until the words run dry. If that's you, take heart: the father in Jesus' most famous parable was a waiting parent too. Here are verses for hope, a prayer for your wandering child, and one small step to keep your heart steady.",
    verses: [
      {
        ref: "Luke 15:20 (KJV)",
        text: "And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him.",
        context: "The father was watching the road — a picture of how God receives the one who turns back.",
      },
      {
        ref: "Proverbs 22:6 (KJV)",
        text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
        context: "A promise to hold onto when the present looks nothing like it — the seeds you planted are not lost.",
      },
      {
        ref: "Isaiah 49:25 (KJV)",
        text: "For I will contend with him that contendeth with thee, and I will save thy children.",
        context: "God himself takes up the fight for your children's rescue.",
      },
      {
        ref: "Philippians 1:6 (KJV)",
        text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
        context: "The work God began in your child is his to finish, not yours.",
      },
    ],
    prayer:
      "Father, you know my child — the one I'm aching over tonight, the one who has wandered far from you and from us. I cannot reach their heart, but you can, and you love them even more than I do. Pursue them in ways I never could; put people and moments in their path that draw them home. Guard their life while they're away, and don't let go of them, even when they've let go of you. Give me the patience of the waiting father, eyes on the road and arms ready to open, and keep my own heart soft and hopeful. I trust you with the child I cannot save. Amen.",
    actionStep:
      "Write your child's name on a card and put it where you'll see it each morning, and pray Luke 15 over them daily — picturing the father running down the road. When fear rises, hand them back to God out loud instead of carrying the dread alone.",
    prayerCta: {
      text: "Aching over a specific child who's wandered? Tell Faith Companion their story and get a personal prayer written for them and for you.",
      buttonLabel: "Write a prayer for my child",
    },
    related: [
      { slug: "prayer-for-a-struggling-marriage", label: "A Prayer for a Struggling Marriage" },
      { slug: "forgiveness", label: "What the Bible Says About Forgiveness" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
    ],
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS);

export function getTopic(slug: string): TopicData | undefined {
  return TOPICS[slug];
}
