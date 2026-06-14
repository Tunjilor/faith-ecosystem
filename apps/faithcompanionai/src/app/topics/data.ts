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
  /** Optional full passage quote (scripture passage pages). Rendered after the hero, in place of the verses list. */
  passage?: { ref: string; text: string };
  /** Optional plain-language "what this passage means" / context section (passage pages). */
  meaning?: string;
  /** Optional short devotional reflection (1–2 paragraphs), rendered between the verses and the prayer. */
  reflection?: string;
  prayer: string;
  /** Optional single "small step" rendered as its own card (used by prayer-focused topics). */
  actionStep?: string;
  /** Optional dedicated call-to-action linking to the live prayer tool (/tools/prayer → /api/ask). */
  prayerCta?: { text: string; buttonLabel: string };
  /** Optional short "5-minute devotional" rendered after the prayer: one passage, one paragraph, one question. */
  devotional?: {
    heading: string;
    passage: { ref: string; text: string };
    reflection: string;
    question: string;
  };
  /** Optional reflection / discussion questions, rendered after the devotional. */
  reflectionQuestions?: { heading: string; questions: string[] };
  /** Optional small-group / family framing, rendered after the reflection questions. */
  discussionGuide?: { heading: string; text: string };
  /** Optional "share this page" block (warm prompt + copy-link button), rendered above Related. */
  shareBlock?: { text: string };
  /** Optional printable-PDF download link (static file in /public/downloads). */
  pdfDownload?: { href: string; label: string };
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
      { slug: "isaiah-41-10", label: "Isaiah 41:10: Fear Not" },
      { slug: "bible-verses-for-depression", label: "Bible Verses for Depression" },
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
      { slug: "romans-8-28", label: "Romans 8:28: All Things for Good" },
      { slug: "jeremiah-29-11", label: "Jeremiah 29:11: Plans & Hope" },
    ],
  },

  hope: {
    topic: "hope",
    title: "Bible Verses for Hope",
    description:
      "Bible verses for hope, a written prayer, and one small step for when hope feels thin. Scripture-grounded encouragement to rebuild confident hope in God.",
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
      { slug: "jeremiah-29-11", label: "Jeremiah 29:11: Plans & Hope" },
      { slug: "romans-8-28", label: "Romans 8:28: All Things for Good" },
      { slug: "faith", label: "Bible Verses About Faith" },
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
      { slug: "joshua-1-9", label: "Joshua 1:9: Be Strong & Courageous" },
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
      { slug: "isaiah-41-10", label: "Isaiah 41:10: Fear Not" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "peace", label: "A Prayer for Peace" },
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
      { slug: "prayer-for-patience-with-a-difficult-person", label: "A Prayer for Patience" },
      { slug: "bible-verses-for-anger-and-self-control", label: "Bible Verses for Anger & Self-Control" },
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
      { slug: "psalm-23", label: "Psalm 23: Comfort in the Valley" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-when-you-cant-sleep", label: "Verses for When You Can't Sleep" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "prayer-for-patience-with-a-difficult-person", label: "A Prayer for Patience" },
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
    title: "Bible Verses About Faith",
    description:
      "Bible verses about faith, a written prayer, and one small step for trusting God when your faith feels weak. Scripture-grounded encouragement for honest doubt.",
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
      { slug: "jeremiah-29-11", label: "Jeremiah 29:11: Plans & Hope" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "prayer-for-when-you-feel-far-from-god", label: "A Prayer When You Feel Far from God" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-for-guidance-when-facing-a-big-decision", label: "A Prayer for Guidance" },
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
      { slug: "psalm-23", label: "Psalm 23: Comfort in the Valley" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
      { slug: "prayer-for-a-friend-who-is-hurting", label: "A Prayer for a Hurting Friend" },
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
      { slug: "joshua-1-9", label: "Joshua 1:9: Be Strong & Courageous" },
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
    devotional: {
      heading: "A 5-Minute Devotional for the Grieving Heart",
      passage: {
        ref: "John 11:33–35 (WEB)",
        text: "When Jesus therefore saw her weeping, and the Jews weeping who came with her, he groaned in the spirit, and was troubled, and said, \"Where have you laid him?\" They told him, \"Lord, come and see.\" Jesus wept.",
      },
      reflection:
        "Jesus was standing minutes away from raising Lazarus from the dead. He knew the grave would be empty before the day was over — and still, he wept. He did not scold the sisters for crying, did not rush them toward the happy ending he was about to bring. He stood in the sorrow with them first. That is what God does with your grief. He does not stand at a distance asking you to hurry up and feel better, and he is not embarrassed by your tears. The God who will one day wipe away every tear is, right now, near enough to share them. Your weeping is not a lack of faith — it is something Jesus himself did, and it is holy ground he is willing to stand on with you.",
      question:
        "Where do you most need to know that God is sitting with you in your grief, rather than rushing you past it?",
    },
    reflectionQuestions: {
      heading: "Reflect or Discuss",
      questions: [
        "What memory of your loved one brings you the most comfort today?",
        "Where have you sensed God's nearness — or felt his absence — in this season of loss?",
        "What is one thing you wish the people around you understood about what you're carrying right now?",
      ],
    },
    discussionGuide: {
      heading: "For Small Groups & Families",
      text: "If you're walking through loss together as a family or a small group, read the verses and the prayer aloud, then give each person room to answer just one of the reflection questions — without being fixed, corrected, or rushed. Grief shared in safe company is lighter than grief carried alone. Your job here is not to solve someone's sorrow but to sit in it with them, the way Christ sat with Mary and Martha at the tomb.",
    },
    prayerCta: {
      text: "This prayer speaks to grief in general. For a prayer written around your specific loss and what you're carrying today, tell Faith Companion what you're going through — who you're missing, what the hardest moments are — and receive words shaped for exactly where you are.",
      buttonLabel: "Write a prayer for my grief",
    },
    shareBlock: {
      text: "Know someone who is grieving? Share these verses and this prayer with them.",
    },
    pdfDownload: {
      href: "/downloads/prayer-for-grief.pdf",
      label: "Download Printable Prayer Card",
    },
    related: [
      { slug: "psalm-23", label: "Psalm 23: Comfort in the Valley" },
      { slug: "romans-8-28", label: "Romans 8:28: All Things for Good" },
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
      { slug: "prayer-for-starting-a-new-job", label: "A Prayer for Starting a New Job" },
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
      { slug: "prayer-for-guidance-when-facing-a-big-decision", label: "A Prayer for Guidance" },
      { slug: "what-does-the-bible-say-about-worry-and-money", label: "What the Bible Says on Worry & Money" },
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
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
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
      { slug: "prayer-to-save-my-marriage", label: "A Prayer to Save My Marriage" },
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
      { slug: "prayer-for-a-loved-one-struggling-with-addiction", label: "A Prayer for a Loved One's Addiction" },
    ],
  },

  "psalm-91": {
    topic: "psalm-91",
    label: "Protection",
    title: "Psalm 91: God's Promise of Protection",
    description:
      "Read Psalm 91 in full (KJV), with a plain explanation of what it means and a written prayer for protection. God's promise of refuge for when you're afraid.",
    intro:
      "When fear is loud — a frightening diagnosis, a dangerous situation, a night you can't stop bracing for the worst — Psalm 91 is the chapter believers have reached for across the centuries. It doesn't pretend danger isn't real; it anchors you to a God who is bigger than it. Here is the full psalm, what it actually promises, and a prayer for when you need to feel safe.",
    verses: [],
    passage: {
      ref: "Psalm 91 (KJV)",
      text: "1 He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.\n2 I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.\n3 Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.\n4 He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.\n5 Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day;\n6 Nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday.\n7 A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.\n8 Only with thine eyes shalt thou behold and see the reward of the wicked.\n9 Because thou hast made the LORD, which is my refuge, even the most High, thy habitation;\n10 There shall no evil befall thee, neither shall any plague come nigh thy dwelling.\n11 For he shall give his angels charge over thee, to keep thee in all thy ways.\n12 They shall bear thee up in their hands, lest thou dash thy foot against a stone.\n13 Thou shalt tread upon the lion and adder: the young lion and the dragon shalt thou trample under feet.\n14 Because he hath set his love upon me, therefore will I deliver him: I will set him on high, because he hath known my name.\n15 He shall call upon me, and I will answer him: I will be with him in trouble; I will deliver him, and honour him.\n16 With long life will I satisfy him, and shew him my salvation.",
    },
    meaning:
      "Psalm 91 is a song about taking shelter in God. Its central image is a small, hunted creature hiding under the wings of something far stronger — \"he shall cover thee with his feathers, and under his wings shalt thou trust.\" The psalmist piles up the dangers of the ancient world — the hunter's trap (the snare of the fowler), plague, war (the arrow that flieth by day), wild animals — and answers each one with God's nearness.\n\nIt matters to read these promises the way Scripture means them, not as a magic charm. Psalm 91 is not a guarantee that nothing bad will ever touch you — faithful people in the Bible still suffered and died. Satan even misused this very psalm to tempt Jesus (Matthew 4:6), and Jesus refused to treat God's protection as something to test. What the psalm promises is deeper than a trouble-free life: that the God of the universe has set his love on you (v. 14), that he is with you in trouble (v. 15), and that nothing can finally separate you from him — not even death, which for the believer opens into \"my salvation\" (v. 16).",
    reflection:
      "You may not be dodging arrows, but you know what your \"terror by night\" is — the worry that wakes you at 3 a.m., the situation you cannot control. Psalm 91 invites you to do one thing with it: dwell. Not to visit God in a panic and leave, but to make him your habitation (v. 9), the place you actually live. Protection here is less a force field around your circumstances and more a Person you can run into again and again. The safest place in the universe is not a place at all — it is God himself.",
    prayer:
      "Father, you are my refuge and my fortress, and today I need to feel it. You know exactly what I am afraid of — the thing I cannot fix or escape on my own. Cover me and the people I love under your wings, and quiet the fear that keeps circling back. Help me to actually live in you, not just run to you when I am scared. And whatever comes, hold me in the truth that nothing can reach me that has not first passed through your hands, and that I am yours in life and in death. In Jesus' name, Amen.",
    actionStep:
      "Tonight, before the fears get loud, read Psalm 91 slowly out loud — your own voice, your own room — and stop at verse 4 to pray it back: \"Cover me with your feathers; let your truth be my shield.\" Leave the chapter open where you'll see it in the morning.",
    prayerCta: {
      text: "Facing a specific fear or danger right now? Tell Faith Companion what you're up against and get a personal prayer for protection written for your situation.",
      buttonLabel: "Write a prayer for protection",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-when-you-cant-sleep", label: "Verses for When You Can't Sleep" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "isaiah-41-10", label: "Isaiah 41:10: Fear Not" },
      { slug: "prayer-for-protection-over-my-family", label: "A Prayer for Family Protection" },
    ],
  },

  "psalm-23": {
    topic: "psalm-23",
    label: "Comfort",
    title: "Psalm 23: Comfort in the Valley",
    description:
      "Read Psalm 23 in full (KJV), with a plain explanation of what it means and a written prayer for comfort. The shepherd's psalm for grief, fear, and hard valleys.",
    intro:
      "Psalm 23 is the passage people reach for at hospital bedsides, at funerals, and in the quiet middle-of-the-night hours when the future feels dark. There is a reason it has comforted the grieving and the frightened for three thousand years: it doesn't promise an easy road, it promises a Shepherd who walks every step of it with you. Here is the full psalm, what it means, and a prayer for the valley you may be in.",
    verses: [],
    passage: {
      ref: "Psalm 23 (KJV)",
      text: "1 The LORD is my shepherd; I shall not want.\n2 He maketh me to lie down in green pastures: he leadeth me beside the still waters.\n3 He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.\n4 Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.\n5 Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.\n6 Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    },
    meaning:
      "David — who had been a shepherd himself before he was a king — describes God as the shepherd and us as the sheep. Sheep are not self-sufficient; they have to be led to food (\"green pastures\"), water (\"still waters\"), and safety. The psalm's quiet claim is that under God's care, \"I shall not want\" — not that you will have everything you desire, but that you will lack nothing you truly need.\n\nThe heart of the psalm is verse 4: \"though I walk through the valley of the shadow of death.\" Notice the word \"through\" — the valley is not the destination, it is a passage, and you do not stay in it. And notice what changes there: the psalm shifts from talking about God (\"he leadeth me\") to talking to God (\"thou art with me\"). In the darkest stretch, God moves from a fact to a presence. The rod and staff were a shepherd's tools — one to fight off predators, one to guide and rescue — so even the valley is not unguarded. And the psalm ends not in the dark but at a table and in a home: \"I will dwell in the house of the LORD for ever.\"",
    reflection:
      "Whatever valley you are walking — grief, fear, a season that feels like a long shadow — Psalm 23 does not ask you to pretend it isn't dark. It simply insists you are not walking it alone. You don't have to feel brave; you only have to keep walking, because the Shepherd sets the pace and knows the way out. Today, let the psalm reframe one thing: the goodness and mercy you are desperate for are not only ahead of you to chase — they are behind you, following you all the days of your life.",
    prayer:
      "Lord, you are my shepherd, and right now I am walking through a valley I did not choose. You know the loss, the fear, the shadow that follows me into each morning. Thank you that you have not sent me through it alone — that you are with me, your presence closer than my own breath. Lead me beside still waters when my mind will not rest, and restore my soul one ordinary day at a time. Help me to trust that this valley is a passage and not my home, and that goodness and mercy are still following me even here. Amen.",
    actionStep:
      "Read Psalm 23 slowly and underline the single word \"through\" in verse 4. When the valley feels permanent today, say it out loud: \"I am walking through this — I am not staying here.\" Then let the Shepherd set the pace.",
    prayerCta: {
      text: "Walking through a specific loss or hard valley? Tell Faith Companion what you're facing and get a gentle, personal prayer written for it.",
      buttonLabel: "Write a prayer for comfort",
    },
    related: [
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
    ],
  },

  "jeremiah-29-11": {
    topic: "jeremiah-29-11",
    label: "Hope",
    title: "Jeremiah 29:11: God's Plans and Hope",
    description:
      "What Jeremiah 29:11 really means in context (WEB), with a plain explanation and a written prayer for hope. God's thoughts of peace, hope, and a future.",
    intro:
      "Jeremiah 29:11 shows up on coffee mugs and graduation cards, but people usually search for it in a harder moment — when the future feels uncertain and they need to believe God is still writing a good story. The verse is even better than the poster version once you see who God first said it to. Here is the verse, the context that makes it land, and a prayer for hope.",
    verses: [],
    passage: {
      ref: "Jeremiah 29:11 (WEB)",
      text: "\"For I know the thoughts that I think toward you,\" says Yahweh, \"thoughts of peace, and not of evil, to give you hope and a future.\"",
    },
    meaning:
      "Here is the part the coffee mugs leave out: God spoke these words to people whose lives had just fallen apart. Jeremiah was writing to Israelites dragged into exile in Babylon — far from home, defeated, grieving. And in the verse just before this, God tells them the exile will last seventy years (Jeremiah 29:10). So the promise of \"hope and a future\" was not a promise that the hardship would end quickly; many who first heard it would die in exile before the restoration came.\n\nThat makes the verse stronger, not weaker. God's plans run on a longer timeline than ours, and his idea of our welfare includes things we cannot see yet. The very next verses tell them what to do while they wait: \"You shall call on me... You shall seek me, and find me, when you search for me with all your heart\" (Jeremiah 29:12–13). Jeremiah 29:11 is not a guarantee that this year will go the way you want. It is a guarantee about God's heart toward you — thoughts of peace, not evil — even in a season that feels like exile.",
    reflection:
      "If you are in a waiting season — a long one, maybe — Jeremiah 29:11 meets you exactly there. It does not promise the wait is almost over; it promises that the One who holds your future is good and is thinking thoughts of peace toward you right now. Hope, in the Bible, is not wishful thinking that things will improve. It is confident trust in the character of the God who is already standing on the other side of your seventy years. Today, you do not have to see the plan to trust the Planner.",
    prayer:
      "Father, you say your thoughts toward me are thoughts of peace and not of evil, and today I need to believe it. You know the part of my future that feels uncertain, the waiting that has worn me down. Thank you that your plans are good even when I cannot trace them, and that your timeline is longer and kinder than mine. Help me to seek you with my whole heart in this in-between season, and to trust that you have not forgotten me. Anchor my hope not in a change of circumstances but in your unchanging character. Amen.",
    actionStep:
      "Write down the one outcome you are anxiously waiting on, then underneath it write Jeremiah 29:12: \"You shall call on me, and I will listen to you.\" Spend two minutes today honestly seeking God about it, instead of only worrying about it.",
    prayerCta: {
      text: "Waiting on God for something specific? Tell Faith Companion what feels uncertain and get a personal, hope-filled prayer written for your situation.",
      buttonLabel: "Write a prayer for hope",
    },
    related: [
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "faith", label: "Bible Verses About Faith" },
    ],
  },

  "isaiah-41-10": {
    topic: "isaiah-41-10",
    label: "Fear and Anxiety",
    title: "Isaiah 41:10: Fear Not, I Am With You",
    description:
      "Isaiah 41:10 (WEB) in full, with a plain explanation of what it means and a written prayer for fear and anxiety. God's promise to be with you and hold you up.",
    intro:
      "When fear has its hand around your throat — a frightening unknown, a situation spinning out of your control — Isaiah 41:10 is one of the most repeated reassurances in all of Scripture. God doesn't just tell you to stop being afraid; he tells you why you can. Here is the verse, what it meant to the people who first heard it, and a prayer for when fear won't let go.",
    verses: [],
    passage: {
      ref: "Isaiah 41:10 (WEB)",
      text: "Don't be afraid, for I am with you. Don't be dismayed, for I am your God. I will strengthen you. Yes, I will help you. Yes, I will uphold you with the right hand of my righteousness.",
    },
    meaning:
      "God spoke these words through the prophet Isaiah to Israel facing exile and enemies far stronger than themselves — people with every earthly reason to be afraid. Notice that God's answer to fear is not a pep talk about their own strength. It is four promises about himself: I am with you, I am your God, I will strengthen you, I will uphold you. Fear shrinks when the focus shifts from the size of the threat to the size of the One who is present.\n\nThe phrase \"the right hand of my righteousness\" is a picture of God's own strong, just hand reaching down to steady someone who would otherwise fall. In the ancient world the right hand was the hand of power and rescue. God is not promising the frightening thing will vanish — he is promising he will personally hold you up inside it. That is why this verse has steadied believers in sickrooms, in war, and in crisis for over 2,700 years: it doesn't deny the danger, it out-weighs it with God's nearness.",
    reflection:
      "Fear tells you that you are alone and that everything depends on you. Isaiah 41:10 answers both lies at once: you are not alone (\"I am with you\"), and it does not all depend on you (\"I will uphold you\"). You don't have to manufacture courage out of nothing — you borrow steadiness from the God who is holding your hand. Today, when the fear rises, you don't have to argue yourself out of it. You only have to remember whose hand is under you.",
    prayer:
      "Father, fear has a grip on me today, and I am tired of fighting it on my own. You see exactly what I am afraid of — the unknown I keep bracing for. Thank you that you have not told me to be brave by myself, but promised to be with me, to strengthen me, and to hold me up with your own hand. Quiet the part of me that believes it all depends on me. Steady my heart with your nearness, and help me to take the next small step trusting that you are already holding the rest. Amen.",
    actionStep:
      "Write Isaiah 41:10 on a card — or set it as your phone's lock screen — and when fear spikes today, read just the four promises slowly: \"I am with you. I am your God. I will strengthen you. I will uphold you.\" Let each one answer the fear before you move on.",
    prayerCta: {
      text: "Gripped by a specific fear right now? Tell Faith Companion what you're afraid of and get a calming, personal prayer written for it.",
      buttonLabel: "Write a prayer for fear",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
      { slug: "philippians-4-6", label: "Philippians 4:6: Do Not Be Anxious" },
      { slug: "psalm-27", label: "Psalm 27: The Lord Is My Light" },
    ],
  },

  "romans-8-28": {
    topic: "romans-8-28",
    label: "Hard Seasons",
    title: "Romans 8:28: All Things Work for Good",
    description:
      "Romans 8:28 (WEB) in full, with a plain explanation of what it really means and a written prayer for hard seasons. God working all things together for good.",
    intro:
      "Romans 8:28 is one of the most quoted — and most misquoted — verses in the Bible, often handed to hurting people as a quick fix. Read carefully and in context, it is far more honest and far more comforting than the bumper-sticker version. Here is the verse, what it actually promises (and what it doesn't), and a prayer for a hard season.",
    verses: [],
    passage: {
      ref: "Romans 8:28 (WEB)",
      text: "We know that all things work together for good for those who love God, to those who are called according to his purpose.",
    },
    meaning:
      "Notice first what this verse does not say. It does not say all things ARE good — Paul, who wrote it, was beaten, imprisoned, and shipwrecked, and his letters are full of grief. It does not say you will see the good, or see it soon. What it says is that God WORKS all things together for good — even the painful, senseless things — for those who love him.\n\nThe picture is not that every bad thing is secretly good, but that God is a master weaver who takes every thread, including the dark ones, and works them into something good that none of them could have produced alone. And Paul defines that \"good\" in the verses right after: being shaped into the likeness of Christ (Romans 8:29), and held by a love that nothing — \"neither death, nor life... nor things present, nor things to come\" (Romans 8:38–39) — can separate us from. Romans 8:28 is not a promise that your hard season will make sense on your timeline. It is a promise that it is not wasted, and not outside God's hands.",
    reflection:
      "When you are in the middle of something painful, Romans 8:28 is not meant to be said quickly or used to skip past the grief. It is an anchor to hold once you have been honest about how much it hurts. You may never see, this side of heaven, how God works a particular loss for good — but you can trust the Weaver even when you cannot see the pattern. Today, you don't have to call the hard thing good. You only have to believe God is good, and that he is still working.",
    prayer:
      "Father, I am in a season I cannot make sense of, and I am tired of pretending it doesn't hurt. You know what I have lost and what I am afraid this will cost me. I don't understand how any good can come from this, but your Word says you are working all things together for good for those who love you — so I bring you the tangled threads of it and ask you to weave them. Help me to trust the Weaver when I cannot see the pattern, and to rest in a love that nothing can separate me from. Until I can see it, hold me. Amen.",
    actionStep:
      "Name the one hard thing you cannot make sense of, and instead of forcing it to feel good, pray one honest sentence: \"God, I don't see the good in this — help me trust that you are still working.\" Then leave it in his hands for today.",
    prayerCta: {
      text: "Walking through a hard season that doesn't make sense? Tell Faith Companion what you're carrying and get a personal prayer written for it.",
      buttonLabel: "Write a prayer for a hard season",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "bible-verses-for-depression", label: "Bible Verses for Depression" },
    ],
  },

  "joshua-1-9": {
    topic: "joshua-1-9",
    label: "Courage",
    title: "Joshua 1:9: Be Strong and Courageous",
    description:
      "Joshua 1:9 (KJV) in full, with a plain explanation of what it means and a written prayer for courage. God's command to be strong because he goes with you.",
    intro:
      "Some seasons ask more of you than you feel you have — a daunting new responsibility, a hard conversation, a step into the unknown. Joshua 1:9 is God's charge to a man standing exactly there, and it has steadied the fearful ever since. Here is the verse, the moment God spoke it, and a prayer for when you need courage you don't feel.",
    verses: [],
    passage: {
      ref: "Joshua 1:9 (KJV)",
      text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    },
    meaning:
      "God spoke these words to Joshua at one of the most intimidating moments imaginable. Moses — the leader who had carried Israel for forty years — had just died, and Joshua was handed the impossible task of leading a whole nation into a land of fortified cities and giants. Three times in this short passage God tells him to be strong and courageous, precisely because Joshua had every reason to be terrified.\n\nNotice that the command to be courageous is not \"believe in yourself.\" It is grounded entirely in a promise: \"for the LORD thy God is with thee whithersoever thou goest.\" Biblical courage is not the absence of fear or confidence in your own ability — it is moving forward because of who goes with you. God doesn't tell Joshua the road will be easy or the enemies small. He tells him the one thing that changes everything: you will not go alone. The courage God commands is always courage he supplies by his presence.",
    reflection:
      "You may be standing at your own Jordan today — a threshold you feel unqualified to cross. Joshua 1:9 does not ask you to feel brave; it commands you to act on a fact: God goes with you \"whithersoever thou goest.\" Courage, then, is not waiting until the fear is gone. It is taking the next step while the fear is still there, trusting the presence that goes ahead of you and behind you. Today, you don't need more confidence in yourself — you need a firmer grip on the God who promised to come along.",
    prayer:
      "Lord, you know the thing in front of me that I feel too small for, and the fear that is telling me to stay where it's safe. You commanded Joshua to be strong and courageous not because he was enough, but because you were with him — and you have promised the same to me. Give me courage that does not depend on my own confidence but on your presence. Help me take the next step even while I am afraid, trusting that you go before me and behind me. Wherever you send me today, go with me, and that will be enough. Amen.",
    actionStep:
      "Name the one step you have been avoiding because it scares you, and take the smallest possible version of it today — one email, one conversation, one decision — praying Joshua 1:9 as you do: \"You are with me wherever I go.\"",
    prayerCta: {
      text: "Facing something that takes more courage than you feel you have? Tell Faith Companion what you're up against and get a personal prayer for courage written for it.",
      buttonLabel: "Write a prayer for courage",
    },
    related: [
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-before-surgery", label: "A Prayer Before Surgery" },
    ],
  },

  "prayer-for-a-friend-who-is-hurting": {
    topic: "prayer-for-a-friend-who-is-hurting",
    label: "a Hurting Friend",
    title: "A Prayer for a Friend Who Is Hurting",
    description:
      "A prayer for a friend who is hurting, with Bible verses on comfort and one small step. When someone you love is in pain and you don't know what to say.",
    intro:
      "When someone you love is hurting — grieving, frightened, falling apart — it's easy to feel helpless, afraid you'll say the wrong thing or do too little. You don't have to fix their pain to love them well; sometimes the most faithful thing is simply to show up and to pray. Here are a few verses to steady you, a prayer for your hurting friend, and one small thing you can do today.",
    verses: [
      {
        ref: "Galatians 6:2 (WEB)",
        text: "Bear one another's burdens, and so fulfill the law of Christ.",
        context: "Praying for a hurting friend is one of the most concrete ways to help carry a weight they can't carry alone.",
      },
      {
        ref: "Romans 12:15 (WEB)",
        text: "Rejoice with those who rejoice. Weep with those who weep.",
        context: "Sometimes love isn't fixing the pain — it's being willing to sit down and grieve alongside it.",
      },
      {
        ref: "2 Corinthians 1:3–4 (WEB)",
        text: "Blessed be the God and Father of our Lord Jesus Christ, the Father of mercies and God of all comfort, who comforts us in all our affliction, that we may be able to comfort those who are in any affliction, through the comfort with which we ourselves are comforted by God.",
        context: "The comfort God has given you in your own hard seasons becomes the comfort you can carry to your friend.",
      },
      {
        ref: "Proverbs 17:17 (KJV)",
        text: "A friend loveth at all times, and a brother is born for adversity.",
        context: "Real friendship proves itself most in the hard seasons, not the easy ones — showing up is the point.",
      },
    ],
    reflection:
      "When you love someone who is hurting, the pressure to say something profound can actually get in the way. Most people in pain don't need answers; they need presence — someone who keeps showing up, listens without rushing to fix, and quietly keeps praying when they can't pray for themselves.\n\nYou cannot carry your friend's pain for them, but you can carry it to God on their behalf, and you can make sure they don't walk through it alone. That is not a small thing. It may be the most Christlike thing you do this week.",
    prayer:
      "Father, my friend is hurting, and I feel so powerless to help. You know exactly what they're carrying — the pain I can see and the parts they can't even put into words. Draw near to them in a way I never could, and let them feel, even faintly, that they are not alone. Give me wisdom to know when to speak and when to simply sit beside them, and the courage to keep showing up even when it's uncomfortable. Comfort them with the comfort that only you can give, and use me however you can to carry a little of the weight. Amen.",
    actionStep:
      "Don't wait until you have the perfect words — send your friend one short, honest message today: \"I'm thinking of you and praying for you, and I'm not going anywhere.\" Then follow it with something concrete: a meal, a visit, or a quiet hour just being there.",
    prayerCta: {
      text: "Walking with a specific friend through something hard? Tell Faith Companion what they're facing and get a personal prayer written for them.",
      buttonLabel: "Write a prayer for my friend",
    },
    related: [
      { slug: "bible-verses-for-grief", label: "Bible Verses for Grief" },
      { slug: "prayer-for-a-sick-parent", label: "A Prayer for a Sick Parent" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-for-a-pregnant-friend-safe-delivery", label: "A Prayer for a Pregnant Friend" },
    ],
  },

  "bible-verses-for-depression": {
    topic: "bible-verses-for-depression",
    label: "Depression",
    title: "Bible Verses for Depression",
    description:
      "Compassionate Bible verses for depression and feeling hopeless, a gentle written prayer, and one small step. God is near to the brokenhearted — you are not alone.",
    intro:
      "If you're reading this while everything feels heavy and gray, please know two things: you are not alone, and you are not failing at faith because you feel this way. Depression can make God feel distant and hope feel impossible — yet Scripture is full of honest, hurting people God never once let go of. Here are a few verses to sit with, a prayer for when you can't find words, and a gentle next step.",
    verses: [
      {
        ref: "Psalm 34:18 (KJV)",
        text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
        context: "When you feel farthest from everything, Scripture says God is in fact nearest — drawn to the broken, not repelled by them.",
      },
      {
        ref: "Psalm 42:11 (WEB)",
        text: "Why are you in despair, my soul? Why are you disturbed within me? Hope in God! For I shall still praise him, the saving help of my countenance, and my God.",
        context: "The psalmist talks honestly to his own downcast soul — proof that faith and depression can occupy the same heart.",
      },
      {
        ref: "Isaiah 43:2 (WEB)",
        text: "When you pass through the waters, I will be with you, and through the rivers, they will not overflow you.",
        context: "God doesn't promise you'll skip the deep water — only that you will not go under it alone.",
      },
      {
        ref: "Matthew 11:28 (WEB)",
        text: "Come to me, all you who labor and are heavily burdened, and I will give you rest.",
        context: "The invitation stands even when you have nothing to bring to it but exhaustion.",
      },
    ],
    reflection:
      "Depression is not a sign of weak faith or a sin to repent of. Some of the most faithful people in the Bible — Elijah under the broom tree, David in the Psalms — prayed their way through seasons of real darkness. These verses are not meant to rush you out of how you feel or tie a bow on genuine pain. They're here to remind you, gently, that God is near to the brokenhearted even when he feels absent, and that this heaviness is not the end of your story.\n\nAnd please hear this clearly: reaching out for help is not a lack of faith — it is a brave and faithful step. If the darkness is deep, tell a trusted friend, a pastor, or a counselor, and if you ever feel unsafe or in crisis, please reach out to a crisis line or someone who can be with you today. God so often sends his help through other people; letting them in is part of how he carries you.",
    prayer:
      "God, I don't have many words today, and even praying feels like effort. You see the heaviness I'm carrying — the hope that feels out of reach, the days that all blur together. Thank you that you are near to the brokenhearted, that you have not turned away from me even though I feel far from you. Hold me through this, and give me just enough light for the next small step. Send people to help carry what I cannot carry alone, and remind me, gently, that your mercies are still new every morning. Amen.",
    actionStep:
      "Do one small, kind thing for yourself today — a glass of water, a short walk, opening a window — and tell one person you trust how you're really doing. You don't need the right words; \"I'm struggling\" is enough to start.",
    prayerCta: {
      text: "Carrying something heavy you can't put into words? Tell Faith Companion as much or as little as you want, and get a gentle, personal prayer written for right where you are.",
      buttonLabel: "Write a prayer for me",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "romans-8-28", label: "Romans 8:28: All Things for Good" },
      { slug: "bible-verses-for-loneliness", label: "Bible Verses for Loneliness" },
    ],
  },

  "prayer-for-guidance-when-facing-a-big-decision": {
    topic: "prayer-for-guidance-when-facing-a-big-decision",
    label: "Guidance",
    title: "A Prayer for Guidance in Big Decisions",
    description:
      "A prayer for guidance when facing a big decision, with Bible verses on God's wisdom and one small step. Seek God's direction when the path forward isn't clear.",
    intro:
      "A big decision has a way of stealing your sleep — the weighing of options, the fear of getting it wrong, the wish that God would just write the answer in the sky. He rarely does that, but he does promise to guide those who ask. Here are a few verses on God's direction, a prayer for wisdom, and one small step for when the path isn't clear.",
    verses: [
      {
        ref: "Proverbs 3:5–6 (KJV)",
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
        context: "Guidance begins not with more analysis but with trusting God more than your own ability to figure it out.",
      },
      {
        ref: "James 1:5 (WEB)",
        text: "But if any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.",
        context: "God is not stingy with wisdom, and he doesn't shame you for not having it — he simply invites you to ask.",
      },
      {
        ref: "Psalm 32:8 (WEB)",
        text: "I will instruct you and teach you in the way which you shall go. I will counsel you with my eye on you.",
        context: "God promises personal, attentive guidance — not a vague hope that things work out.",
      },
      {
        ref: "Proverbs 16:9 (WEB)",
        text: "A man's heart plans his course, but Yahweh directs his steps.",
        context: "You can plan wisely and still hold the outcome loosely, trusting God to direct the steps you can't see.",
      },
    ],
    reflection:
      "We often want guidance to arrive as certainty — the whole map before we'll take a step. But Scripture describes guidance more like a lamp for the feet than a floodlight on the horizon: enough light for the next step, given as you walk. That means seeking God in a decision is less about extracting a secret answer and more about surrendering the outcome to a God you trust.\n\nDo the honest work — pray, seek counsel, weigh it wisely — and then move forward in faith, trusting that a God who promised to direct your steps will not let a surrendered heart wander too far. You don't have to see the whole path to take the next faithful step on it.",
    prayer:
      "Father, I have a decision in front of me that feels too big to get wrong, and I keep turning it over without peace. You have promised wisdom to anyone who asks, so I'm asking — give me clarity where I'm confused and calm where I'm anxious. Help me to trust you more than my own understanding, and to want your will more than I want a particular outcome. Direct my steps even when I can't see the whole path, and guard me from deciding out of fear. I place this choice, and its results, in your hands. Amen.",
    actionStep:
      "Write the decision at the top of a page, list what you genuinely know and what you don't, and pray James 1:5 over it: \"God, I lack wisdom — please give it.\" Then ask one wise, trusted person for their honest input this week before you decide.",
    prayerCta: {
      text: "Facing a specific decision right now? Tell Faith Companion what you're weighing and get a personal prayer for guidance written for your situation.",
      buttonLabel: "Write a prayer for guidance",
    },
    related: [
      { slug: "faith", label: "Bible Verses About Faith" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "prayer-for-financial-provision", label: "A Prayer for Financial Provision" },
    ],
  },

  "prayer-for-patience-with-a-difficult-person": {
    topic: "prayer-for-patience-with-a-difficult-person",
    label: "Patience",
    title: "A Prayer for Patience with Hard People",
    description:
      "A prayer for patience with a difficult person, with Bible verses on patience and one small step. Find grace for the relationship that keeps testing yours.",
    intro:
      "Some people seem placed in our lives to wear down our patience — a coworker, a relative, a neighbor who pushes every button you have. You can't always change them, and you may not be able to avoid them, but you can ask God to change how you respond. Here are a few verses on patience, a prayer for the relationship that keeps testing yours, and one small step.",
    verses: [
      {
        ref: "Ephesians 4:2 (WEB)",
        text: "with all lowliness and humility, with patience, bearing with one another in love;",
        context: "\"Bearing with\" is honest language — some people we love by enduring them patiently, not by enjoying them.",
      },
      {
        ref: "Proverbs 15:1 (KJV)",
        text: "A soft answer turneth away wrath: but grievous words stir up anger.",
        context: "Your response, not their behavior, is the part you actually control — and the part God can use.",
      },
      {
        ref: "1 Corinthians 13:4 (KJV)",
        text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
        context: "Love is literally defined as long-suffering — patience isn't extra credit, it's the heart of love.",
      },
      {
        ref: "James 1:19 (WEB)",
        text: "let every man be swift to hear, slow to speak, and slow to anger;",
        context: "A simple, hard discipline to carry into the next tense conversation.",
      },
    ],
    reflection:
      "Patience with a difficult person rarely arrives as a warm feeling. More often it's a decision, made in the moment, to respond with grace instead of reacting with frustration — and it usually has to be made again the next day. The good news is that this is exactly the kind of growth God specializes in.\n\nIt helps to remember how patiently God bears with you. The person testing your patience is also someone he loves, someone he is patient with. Praying for them — genuinely, not through gritted teeth — slowly changes your own heart, even when it doesn't change theirs. You may not get an easier person; you can get a steadier you.",
    prayer:
      "Lord, you know exactly who I'm thinking of, and how quickly my patience runs out with them. I confess the irritation and the unkind thoughts I've been carrying. Thank you for how patiently you bear with me, every day, without keeping score. Give me that same patience — a soft answer when I want a sharp one, and the grace to be slow to anger. Where I cannot change this person, change me, and help me to see them the way you do. Amen.",
    actionStep:
      "Before your next interaction with them, pray one sentence: \"God, give me patience and a soft answer here.\" Then this week, ask God to bless that person by name — not because they've earned it, but because praying for someone slowly softens how you see them.",
    prayerCta: {
      text: "Struggling with a specific difficult relationship? Tell Faith Companion what's going on and get a personal prayer for patience written for it.",
      buttonLabel: "Write a prayer for patience",
    },
    related: [
      { slug: "forgiveness", label: "What the Bible Says About Forgiveness" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "bible-verses-for-anger-and-self-control", label: "Bible Verses for Anger & Self-Control" },
    ],
  },

  "prayer-for-starting-a-new-job": {
    topic: "prayer-for-starting-a-new-job",
    label: "a New Job",
    title: "A Prayer for Starting a New Job",
    description:
      "A prayer for starting a new job and the nervous first day, with Bible verses and one small step. Walk into the new role trusting God goes in with you.",
    intro:
      "The first day at a new job carries its own particular nerves — new faces and systems, the quiet fear of not measuring up, the pressure to prove you belong. Whether you're excited, terrified, or both, you don't walk in alone. Here are a few verses for the new chapter, a prayer for your first days, and one small step to settle your heart.",
    verses: [
      {
        ref: "Colossians 3:23 (KJV)",
        text: "And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",
        context: "On day one, your truest boss is God — which quietly frees you from performing for everyone watching.",
      },
      {
        ref: "Joshua 1:9 (KJV)",
        text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
        context: "A new building, new people, new expectations — and God walks through the door with you.",
      },
      {
        ref: "Philippians 1:6 (KJV)",
        text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
        context: "God is committed to finishing what he starts in you — and that includes this new chapter.",
      },
      {
        ref: "Ecclesiastes 9:10 (WEB)",
        text: "Whatever your hand finds to do, do it with your might.",
        context: "Show up fully to the small, unglamorous tasks of the first weeks — faithfulness in little builds real trust.",
      },
    ],
    reflection:
      "The impostor feeling that shadows a new job — \"they'll figure out I don't belong here\" — loses much of its power when you remember who you're actually working for. You don't have to earn your worth from a new manager or a new team; your worth is already settled in God, which frees you to learn slowly, ask questions, and make the inevitable first-week mistakes without spiraling.\n\nDo your work heartily, as to the Lord. Be quick to listen and slow to assume. And trust that the same God who opened this door is committed to finishing the good work he's begun in you — one ordinary day at a time.",
    prayer:
      "Father, thank you for this new job — for the open door and the provision it represents. You know the nerves I'm carrying into the first day: the fear of falling short, of not fitting in, of being found out. Steady my heart with the truth that my worth is secure in you, not in my performance. Help me to work heartily as for you, to be humble and teachable, and to treat the people around me with kindness. Go with me through that door, and let me be a quiet light in this new place. Amen.",
    actionStep:
      "The night before — or the morning of — your first day, pray Joshua 1:9 over yourself: \"You are with me wherever I go.\" Then choose one simple goal for day one, like learning three coworkers' names, instead of trying to prove yourself all at once.",
    prayerCta: {
      text: "Starting a specific new role? Tell Faith Companion about it and get a personal prayer for your first day written for you.",
      buttonLabel: "Write a prayer for my new job",
    },
    related: [
      { slug: "prayer-for-a-job-interview", label: "A Prayer for a Job Interview" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "prayer-for-the-first-day-of-school", label: "A Prayer for the First Day of School" },
    ],
  },

  "what-does-the-bible-say-about-worry-and-money": {
    topic: "what-does-the-bible-say-about-worry-and-money",
    label: "Money Worries",
    title: "What the Bible Says on Worry & Money",
    description:
      "What does the Bible say about worry and money? Key WEB/KJV verses, a plain reflection, and a written prayer for financial worry — trusting God over fear.",
    intro:
      "Few things stir up worry like money — the bills, the shortfall, the comparison, the sense that it's never quite enough. The Bible has a great deal to say about both, and it's surprisingly freeing: it doesn't shame you for needing money, but it does invite you out from under its weight. Here is what Scripture teaches about worry and money, plus a prayer for when the numbers won't stop circling in your head.",
    verses: [
      {
        ref: "Matthew 6:24 (WEB)",
        text: "No one can serve two masters, for either he will hate the one and love the other, or else he will be devoted to one and despise the other. You can't serve both God and Mammon.",
        context: "Jesus frames money as a rival master — much of our worry comes from quietly serving it instead of trusting God.",
      },
      {
        ref: "Matthew 6:33 (KJV)",
        text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        context: "Jesus' answer to money worry isn't a budgeting tip — it's a reordering of what you seek first.",
      },
      {
        ref: "1 Timothy 6:6–7 (KJV)",
        text: "But godliness with contentment is great gain. For we brought nothing into this world, and it is certain we can carry nothing out.",
        context: "Scripture's wealth strategy starts with contentment, not accumulation — gain measured in peace, not totals.",
      },
      {
        ref: "Hebrews 13:5 (WEB)",
        text: "Be free from the love of money, content with such things as you have, for he has said, \"I will in no way leave you, nor forsake you.\"",
        context: "The cure for money fear is tied not to a bigger balance but to God's promise of his unfailing presence.",
      },
      {
        ref: "Proverbs 30:8 (KJV)",
        text: "Remove far from me vanity and lies: give me neither poverty nor riches; feed me with food convenient for me.",
        context: "A rare, honest prayer for enough — neither crushing poverty nor distracting wealth.",
      },
    ],
    reflection:
      "Put together, the Bible's teaching on worry and money is strikingly consistent. It never treats money as evil, but it repeatedly warns that the love of it, and the worry that travels with it, can quietly take God's place as the thing we trust to keep us safe. Jesus' counsel isn't to care less about provision — it's to seek God first and trust the Father who feeds the birds to know what you need.\n\nThe antidote Scripture offers is not a windfall but contentment, anchored in a promise: \"I will never leave you nor forsake you.\" Money can vanish; God's presence won't. Faith with money doesn't mean you stop being responsible — you still budget, work, and plan wisely. It means you do all of that with open hands, refusing to let a number become the master only God should be.",
    prayer:
      "Father, you know the exact figures that keep me up at night, and how easily money becomes the thing I trust to keep me safe. Forgive me for serving it with my worry instead of trusting you with my needs. Thank you that you have promised never to leave me or forsake me, and that my security was never meant to rest on a balance. Teach me contentment with what I have, give me wisdom with what I steward, and help me to seek your kingdom first. Provide what we truly need, and quiet the fear that says it's all on me. Amen.",
    actionStep:
      "Name the one money fear that circles most, and write Matthew 6:33 beside it. Then take one concrete, faithful step this week — an honest look at the budget, one conversation, one small payment — and consciously hand the rest to God instead of carrying it alone.",
    prayerCta: {
      text: "Worried about a specific financial situation? Tell Faith Companion what you're facing and get a personal, Scripture-based prayer written for it.",
      buttonLabel: "Write a prayer for my finances",
    },
    related: [
      { slug: "prayer-for-financial-provision", label: "A Prayer for Financial Provision" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "faith", label: "Bible Verses About Faith" },
    ],
  },

  "prayer-for-a-loved-one-struggling-with-addiction": {
    topic: "prayer-for-a-loved-one-struggling-with-addiction",
    label: "a Loved One's Addiction",
    title: "A Prayer for a Loved One in Addiction",
    description:
      "A prayer for a loved one struggling with addiction, with Bible verses on freedom and one small step. Hope and intercession when someone you love is bound.",
    intro:
      "Loving someone caught in addiction is its own kind of heartbreak — the broken promises, the helplessness, the fear of the phone ringing at 3 a.m. You can't control or cure them, but you can pray, and the God you're praying to is in the business of setting captives free. Here are a few verses to hold onto, a prayer for the one you love, and one small step for today.",
    verses: [
      {
        ref: "2 Corinthians 10:4 (KJV)",
        text: "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds.",
        context: "Addiction is a stronghold, and your prayers are not wishful thinking — they are a real weapon against it.",
      },
      {
        ref: "Psalm 107:13–14 (KJV)",
        text: "Then they cried unto the LORD in their trouble, and he saved them out of their distresses. He brought them out of darkness and the shadow of death, and brake their bands in sunder.",
        context: "A picture of God literally breaking the chains of those who cry out to him from the dark.",
      },
      {
        ref: "John 8:36 (WEB)",
        text: "If therefore the Son makes you free, you will be free indeed.",
        context: "The freedom Jesus gives reaches the deep places that willpower and rehab alone cannot.",
      },
      {
        ref: "Jeremiah 32:27 (KJV)",
        text: "Behold, I am the LORD, the God of all flesh: is there any thing too hard for me?",
        context: "Addiction can feel unbreakable — but nothing is too hard for the God you are bringing it to.",
      },
    ],
    reflection:
      "When you love an addict, one of the hardest lessons is that you cannot do their recovery for them. You can love them, set healthy boundaries, and refuse to give up — but the change has to happen in them, and ultimately only God can reach a will that's bound. That can feel powerless. It isn't.\n\nPrayer puts the battle where it belongs: in the hands of the One who breaks chains. Keep praying, keep loving wisely, and don't carry this alone — God often works through counselors, support groups, and other people who understand. Loving someone in addiction is a long obedience; let God carry what you were never meant to carry by yourself.",
    prayer:
      "Father, you know the person I'm aching over, and the grip this addiction has on them. I cannot reach their heart, but you can — pursue them, even into the places I can't follow. Break the chains that bind them, and put people and moments in their path that lead them toward freedom and toward you. Give me wisdom to love them well without enabling the addiction, and the strength to keep hoping when I'm exhausted. Guard their life, soften their heart, and remind me that nothing is too hard for you. I place them in your hands. Amen.",
    actionStep:
      "Write your loved one's name on a card and pray Psalm 107 over them each day this week — \"break their bands in sunder.\" Then take one step to care for yourself too: tell a trusted friend, a pastor, or a support group what you're carrying, so you're not walking it alone.",
    prayerCta: {
      text: "Carrying a specific loved one through addiction? Tell Faith Companion their story and get a personal prayer written for them and for you.",
      buttonLabel: "Write a prayer for my loved one",
    },
    related: [
      { slug: "prayer-for-a-prodigal-child", label: "A Prayer for a Prodigal Child" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
    ],
  },

  "bible-verses-for-loneliness": {
    topic: "bible-verses-for-loneliness",
    label: "Loneliness",
    title: "Bible Verses for Loneliness",
    description:
      "Bible verses for loneliness, a written prayer, and one small step for when you feel unseen and alone. God's promise of his nearness and belonging.",
    intro:
      "Loneliness can ache whether you're physically by yourself or surrounded by people who don't really know you. It whispers that you're forgotten, unseen, on your own. Scripture answers with a steady promise that runs from Genesis to Revelation: you are not alone, and you never were. Here are a few verses for the lonely heart, a prayer, and one small step toward connection.",
    verses: [
      {
        ref: "Deuteronomy 31:6 (KJV)",
        text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
        context: "God's promise isn't that you'll always have company — it's that he himself will never leave your side.",
      },
      {
        ref: "Psalm 68:6 (KJV)",
        text: "God setteth the solitary in families.",
        context: "God's heart is to move the isolated into belonging — he notices the lonely and acts on their behalf.",
      },
      {
        ref: "Matthew 28:20 (WEB)",
        text: "Behold, I am with you always, even to the end of the age.",
        context: "Jesus' final promise before leaving earth was his presence — every single day, to the very end.",
      },
      {
        ref: "Psalm 25:16 (KJV)",
        text: "Turn thee unto me, and have mercy upon me; for I am desolate and afflicted.",
        context: "Scripture gives words to loneliness — you can pray your isolation honestly, exactly as it feels.",
      },
    ],
    reflection:
      "There's a difference between solitude and loneliness. Solitude can be filled with God's presence; loneliness feels like an absence. The good news is that the God who promises to never leave you is just as present in the empty apartment as in the crowded room — and learning to sense his nearness is part of how the ache eases.\n\nBut God also made us for each other, and he often answers loneliness through people. So the call is twofold: lean into the One who is always there, and take the risk of reaching toward others, even when it's hard. You are more known, and more wanted, than loneliness will ever let you believe.",
    prayer:
      "Father, I feel alone, and the ache of it is heavy today. You see the isolation I carry, the longing to be known and wanted. Thank you that you have promised never to leave me or forsake me — that even now, in this quiet, you are here. Help me to feel your nearness, and to believe I am not forgotten. Set me, in your kindness, into real belonging, and give me the courage to reach toward others instead of hiding. Be my company until then, and let me know I am yours. Amen.",
    actionStep:
      "Take one small step toward connection today — text someone you've lost touch with, say yes to an invitation, or simply sit somewhere people gather. Then spend two minutes telling God honestly how the loneliness feels; he is nearer than it seems.",
    prayerCta: {
      text: "Feeling alone in a specific season right now? Tell Faith Companion what's on your heart and get a gentle, personal prayer written for it.",
      buttonLabel: "Write a prayer for loneliness",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "bible-verses-for-depression", label: "Bible Verses for Depression" },
      { slug: "psalm-139", label: "Psalm 139: You Have Searched Me" },
    ],
  },

  "prayer-for-protection-over-my-family": {
    topic: "prayer-for-protection-over-my-family",
    label: "Family Protection",
    title: "A Prayer for Protection Over My Family",
    description:
      "A prayer for protection over my family, with Bible verses on God's shelter and one small step. Cover your spouse, children, and home with prayer.",
    intro:
      "When you love a family, the instinct to protect them runs deep — and so does the worry, because so much of their safety is outside your control. You can't guard every road they travel or every choice they make, but you can entrust them, daily, to the God who never sleeps. Here are a few verses on his protection, a prayer over your household, and one small step.",
    verses: [
      {
        ref: "Psalm 91:1–2 (KJV)",
        text: "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty. I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
        context: "The same refuge you run to is the shelter you can ask God to spread over your whole household.",
      },
      {
        ref: "Proverbs 18:10 (KJV)",
        text: "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",
        context: "God's own name is a fortress your family can run into — safety found in him, not in your own vigilance.",
      },
      {
        ref: "Psalm 121:7–8 (KJV)",
        text: "The LORD shall preserve thee from all evil: he shall preserve thy soul. The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
        context: "God watches over the daily comings and goings of the people you love, awake when you can't be.",
      },
      {
        ref: "Isaiah 54:13 (KJV)",
        text: "And all thy children shall be taught of the LORD; and great shall be the peace of thy children.",
        context: "God's protection covers their hearts and their peace, not only their physical safety.",
      },
    ],
    reflection:
      "Praying for your family's protection is not a magic shield against all trouble — faithful families still face hard things, and God's care is bigger than mere safety. What this prayer really does is move your family from your white-knuckled grip into the hands of the One who loves them even more than you do.\n\nThat shift matters, because the fear of all that could happen can quietly rule a home. Cover your family in prayer, do the wise and practical things, and then release them, again and again, to God. His protection reaches places you can't follow — into their hearts, their friendships, their futures.",
    prayer:
      "Father, I bring my family before you and ask you to be their refuge and strong tower. You know each of them by name — guard their going out and their coming in, their bodies and their hearts. Protect them from harm I can see and harm I can't, and where I cannot be, be there. Quiet the fear in me that wants to control what only you can hold, and help me to trust them to your care. Draw each of them close to you, and let your peace rest over our home. Amen.",
    actionStep:
      "Tonight, pray over your family by name — out loud if you can — asking God's protection over each person specifically. Make it a habit: a one-minute blessing at the door, the dinner table, or bedtime.",
    prayerCta: {
      text: "Worried about a specific situation with your family? Tell Faith Companion what's going on and get a personal prayer for protection written for it.",
      buttonLabel: "Write a prayer for my family",
    },
    related: [
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "faith", label: "Bible Verses About Faith" },
      { slug: "psalm-121", label: "Psalm 121: God Watches Over You" },
    ],
  },

  "bible-verses-for-anger-and-self-control": {
    topic: "bible-verses-for-anger-and-self-control",
    label: "Anger & Self-Control",
    title: "Bible Verses for Anger & Self-Control",
    description:
      "Bible verses for anger and self-control, a written prayer, and one small step. What Scripture says about a hot temper and the Spirit-grown fruit of self-control.",
    intro:
      "Anger has a way of arriving faster than wisdom — the sharp word you regret, the slow burn you can't shake, the reaction that doesn't match the person you want to be. Scripture doesn't shame you for feeling anger; it teaches you what to do with it. Here are a few verses on anger and self-control, a prayer for a steadier heart, and one small step.",
    verses: [
      {
        ref: "James 1:19–20 (KJV)",
        text: "let every man be swift to hear, slow to speak, slow to wrath: for the wrath of man worketh not the righteousness of God.",
        context: "Anger feels righteous in the moment, but it rarely produces the good it promises.",
      },
      {
        ref: "Proverbs 16:32 (KJV)",
        text: "He that is slow to anger is better than the mighty; and he that ruleth his spirit than he that taketh a city.",
        context: "Mastering your own temper is counted a greater strength than conquering a city.",
      },
      {
        ref: "Ephesians 4:26–27 (WEB)",
        text: "Be angry, and don't sin. Don't let the sun go down on your wrath, and don't give place to the devil.",
        context: "Anger itself isn't the sin — what you do with it, and how long you nurse it, is.",
      },
      {
        ref: "Galatians 5:22–23 (WEB)",
        text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control.",
        context: "Self-control isn't willpower you manufacture — it's fruit the Spirit grows in you over time.",
      },
      {
        ref: "Proverbs 29:11 (KJV)",
        text: "A fool uttereth all his mind: but a wise man keepeth it in till afterwards.",
        context: "Wisdom often lives in the pause — holding the reaction until the heat has passed.",
      },
    ],
    reflection:
      "Anger usually isn't the real problem; it's a messenger. It points to something underneath — a hurt, a fear, a boundary crossed, a sense of injustice. The goal isn't to never feel it, but to stop letting it drive. Scripture's wisdom is mostly about the gap between feeling and reacting: be slow, keep it in till afterward, don't let it fester overnight.\n\nAnd here's the freeing part: self-control is listed as fruit of the Spirit, not a personality trait you either have or don't. That means it grows. Every time you pause instead of erupt, you're cooperating with something God is doing in you. You won't get there by trying harder alone — you get there by inviting the Spirit into the moment the heat rises.",
    prayer:
      "Father, you know how quickly my anger flares, and the words and reactions I later regret. Forgive me for the times my temper has hurt the people around me. Thank you that self-control is fruit your Spirit grows — I can't manufacture it on my own, so I'm asking you for it. Give me the grace to be slow to anger, to pause before I speak, and to hand you what's underneath the heat. Where my anger has done damage, help me make it right, and grow in me a steadier, gentler heart. Amen.",
    actionStep:
      "Notice your most common anger trigger, and decide in advance on your pause — step away, breathe, count to ten, pray one sentence: \"Spirit, give me self-control here.\" Practicing the pause before you need it makes it possible when you do.",
    prayerCta: {
      text: "Wrestling with anger in a specific relationship or situation? Tell Faith Companion what's going on and get a personal, Scripture-based prayer written for it.",
      buttonLabel: "Write a prayer for self-control",
    },
    related: [
      { slug: "forgiveness", label: "What the Bible Says About Forgiveness" },
      { slug: "prayer-for-patience-with-a-difficult-person", label: "A Prayer for Patience" },
      { slug: "peace", label: "A Prayer for Peace" },
    ],
  },

  "prayer-for-a-pregnant-friend-safe-delivery": {
    topic: "prayer-for-a-pregnant-friend-safe-delivery",
    label: "a Safe Delivery",
    title: "A Prayer for a Pregnant Friend",
    description:
      "A prayer for a pregnant friend and a safe delivery, with Bible verses and one small step. Lift up both mother and baby to the God who knits life together.",
    intro:
      "When a friend is expecting, the joy often comes braided with worry — for her health, for the baby, for the delivery still ahead. One of the best gifts you can give her is to carry those hopes and fears to God on her behalf. Here are a few verses for mother and baby, a prayer for a safe delivery, and one small way to support her.",
    verses: [
      {
        ref: "Psalm 139:13–14 (WEB)",
        text: "For you formed my inmost being. You knit me together in my mother's womb. I will give thanks to you, for I am fearfully and wonderfully made.",
        context: "The God knitting this baby together already loves them — more than even their parents can.",
      },
      {
        ref: "Jeremiah 1:5 (KJV)",
        text: "Before I formed thee in the belly I knew thee; and before thou camest forth out of the womb I sanctified thee.",
        context: "This child is already known by name to God, long before their first breath.",
      },
      {
        ref: "Isaiah 40:11 (WEB)",
        text: "He will gather the lambs in his arm, and carry them in his bosom. He will gently lead those who have their young.",
        context: "God has a particular tenderness for mothers and the very young — he leads them gently.",
      },
      {
        ref: "Philippians 4:6 (KJV)",
        text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
        context: "A verse to pray over your friend's anxiety as the delivery draws near — every worry, handed to God.",
      },
    ],
    reflection:
      "Pregnancy holds joy and vulnerability in the same hands. For all that modern medicine can do, so much of it is still outside anyone's control — which is exactly why it's such fertile ground for prayer. To intercede for a pregnant friend is to stand in the gap for two people at once: a mother carrying hope and fear, and a baby being formed by God's own hands.\n\nYou don't have to have the perfect words or fix her worries. You simply keep lifting them up — her health, the baby's, the delivery, the days after — and keep showing up in practical love. The same God who is knitting this child together is well able to carry them both safely through.",
    prayer:
      "Father, thank you for the new life you are forming, and for my friend who carries it. You knew this baby before the world did, and you love them already. Watch over them both through these months — guard her health, strengthen her body, and bring this child safely into her arms. Quiet her fears as the delivery approaches, and surround her with peace that passes understanding. Be the gentle Shepherd who carries the lambs, and let her feel your nearness in every step of this. Amen.",
    actionStep:
      "Tell your friend, in a text or a note, that you're praying specifically for her and the baby's safe arrival — then ask one concrete way you can help, whether it's a meal, a ride, or simply checking in. Praying with her, not just for her, is a gift she'll remember.",
    prayerCta: {
      text: "Walking with a specific friend through her pregnancy? Tell Faith Companion about her and get a personal prayer for her and the baby written for you to pray.",
      buttonLabel: "Write a prayer for my friend",
    },
    related: [
      { slug: "prayer-for-a-friend-who-is-hurting", label: "A Prayer for a Hurting Friend" },
      { slug: "faith", label: "Bible Verses About Faith" },
      { slug: "hope", label: "Bible Verses for Hope" },
    ],
  },

  "prayer-for-when-you-feel-far-from-god": {
    topic: "prayer-for-when-you-feel-far-from-god",
    label: "When God Feels Distant",
    title: "A Prayer When You Feel Far from God",
    description:
      "A prayer for when you feel far from God, with Bible verses on his nearness and one small step. Find your way back when prayer feels empty and God feels distant.",
    intro:
      "Almost every honest believer hits seasons where God feels distant — when prayer feels like talking to the ceiling and the faith that once felt alive feels flat. If that's you, take heart: feeling far from God is not the same as being far from God, and you are not the first to walk this stretch. Here are a few verses on his nearness, a prayer for the dry season, and one small step back.",
    verses: [
      {
        ref: "James 4:8 (KJV)",
        text: "Draw nigh to God, and he will draw nigh to you.",
        context: "The distance you feel isn't God backing away — and one honest step toward him is always met.",
      },
      {
        ref: "Deuteronomy 4:29 (KJV)",
        text: "But if from thence thou shalt seek the LORD thy God, thou shalt find him, if thou seek him with all thy heart and with all thy soul.",
        context: "God is findable — never hidden from a heart that genuinely seeks him, even from a far country.",
      },
      {
        ref: "Psalm 139:7–8 (WEB)",
        text: "Where could I go from your Spirit? Or where could I flee from your presence? If I ascend up into heaven, you are there. If I make my bed in Sheol, behold, you are there!",
        context: "Even when God feels absent, there is nowhere his presence actually isn't.",
      },
      {
        ref: "Psalm 73:26 (WEB)",
        text: "My flesh and my heart fails, but God is the strength of my heart and my portion forever.",
        context: "Feelings rise and fall, but God's nearness doesn't depend on whether you can feel it today.",
      },
    ],
    reflection:
      "Feeling far from God is one of the most common — and least talked about — parts of a real faith. The great believers wrote whole psalms from this place. It can come from grief, exhaustion, sin, depression, or no clear reason at all. The danger isn't the distance; it's concluding that the distance is the truth about you and God.\n\nFaith in the dry seasons looks less like feeling and more like showing up — opening the Bible when it feels dull, praying honest, half-empty prayers, staying near God's people. Feelings are real, but they aren't the measure of God's presence. Keep walking toward him; he has not moved, and the One you're looking for is the One drawing you to look.",
    prayer:
      "Father, you feel far away right now, and I miss the nearness I once knew. I don't fully understand this distance — whether it's something in me, this hard season, or just the silence — but I'm turning toward you anyway. Your Word says if I draw near, you'll draw near to me, so here I am, with as much heart as I can find. Meet me in the dryness. Remind me that you have not moved, even when I can't feel you, and that you are still my portion when my heart fails. Lead me back to you. Amen.",
    actionStep:
      "Don't wait to feel close before you come — do one small, ordinary thing of faith today: read one psalm slowly, or pray one honest sentence even if it feels empty. Showing up is the step; God meets you in it.",
    prayerCta: {
      text: "Going through a dry or distant season with God? Tell Faith Companion where you are and get a gentle, personal prayer written to help you find your way back.",
      buttonLabel: "Write a prayer for me",
    },
    related: [
      { slug: "faith", label: "Bible Verses About Faith" },
      { slug: "hope", label: "Bible Verses for Hope" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "psalm-139", label: "Psalm 139: You Have Searched Me" },
    ],
  },

  "prayer-for-the-first-day-of-school": {
    topic: "prayer-for-the-first-day-of-school",
    label: "My Child's First Day",
    title: "A Prayer for the First Day of School",
    description:
      "A prayer for the first day of school, with Bible verses for parents and one small step. Entrust your child to God as they head into a new year.",
    intro:
      "The first day of school stirs up more than your child's nerves — as a parent, you feel it too: the pride, the worry, the strange ache of watching them walk away from you toward a world you can't fully see into. You can't go with them into every classroom, but the God who loves them already is going ahead of them. Here are a few verses for the morning of drop-off, a prayer over your child, and one small step.",
    verses: [
      {
        ref: "Deuteronomy 31:8 (KJV)",
        text: "And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed.",
        context: "God goes ahead of your child into the unknown of a new year — they don't walk in alone.",
      },
      {
        ref: "Psalm 127:3 (KJV)",
        text: "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.",
        context: "Your child is a gift entrusted to you — and today you can entrust them back to the Giver.",
      },
      {
        ref: "Proverbs 22:6 (KJV)",
        text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
        context: "The foundation you've been laying at home walks through the school doors with them.",
      },
      {
        ref: "Philippians 1:6 (KJV)",
        text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
        context: "God is committed to finishing the good work he's begun in your child — this year included.",
      },
    ],
    reflection:
      "Every first day of school is a small letting go. From the moment they were born, the whole arc of parenting has been about preparing them to walk into rooms you're not in — and that's exactly how it's supposed to be, even when it tugs at your heart. The fear you feel is just love with nowhere to put itself yet.\n\nSo put it in prayer. You can't control the friendships they'll make, the teacher they'll get, or the hard days they'll have — but you can entrust all of it to a God who goes before them and never leaves. Send them off covered in prayer, and then trust the One who loves them even more than you do.",
    prayer:
      "Father, today my child steps into something new, and my heart is full of both pride and worry. Go before them into that classroom and every place I can't follow. Give them kind friends, patient teachers, and confidence that comes from knowing they are loved by you and by us. Guard their heart, help them be a light to others, and bring them home to me at the end of the day. Where I have to let go, help me to trust you with the child you've entrusted to me. Amen.",
    actionStep:
      "Before drop-off, place your hand on your child (or text them, if they're older) and pray a short blessing out loud: \"God goes with you today, and so does our love.\" Then release the worry to him as you walk away.",
    prayerCta: {
      text: "Sending a specific child into a new school or grade? Tell Faith Companion about them and get a personal prayer written for their first day.",
      buttonLabel: "Write a prayer for my child",
    },
    related: [
      { slug: "prayer-for-starting-a-new-job", label: "A Prayer for Starting a New Job" },
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "faith", label: "Bible Verses About Faith" },
    ],
  },

  "prayer-to-save-my-marriage": {
    topic: "prayer-to-save-my-marriage",
    label: "a Marriage in Crisis",
    title: "A Prayer to Save My Marriage",
    description:
      "A prayer to save my marriage when it's falling apart or divorce is on the table, with Bible verses on restoration and one small step. Hope when it feels too late.",
    intro:
      "If your marriage feels like it's slipping through your fingers — the word \"divorce\" spoken out loud, the distance grown into a canyon, the fear that it may be too late — this is a desperate and holy place to pray from. God is not finished where you think you are, and reconciliation is the kind of impossible he specializes in. Here are a few verses to hold onto, a prayer for a marriage in crisis, and one small step.",
    verses: [
      {
        ref: "Mark 10:9 (KJV)",
        text: "What therefore God hath joined together, let not man put asunder.",
        context: "God's heart is for restoration, not separation — your marriage matters deeply to him.",
      },
      {
        ref: "Joel 2:25 (KJV)",
        text: "And I will restore to you the years that the locust hath eaten.",
        context: "God specializes in restoring what's been devoured — even years of damage are not beyond him.",
      },
      {
        ref: "Ezekiel 36:26 (KJV)",
        text: "A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh.",
        context: "Only God can soften a hardened heart — yours, or your spouse's — and softened hearts are where hope begins.",
      },
      {
        ref: "Matthew 19:26 (KJV)",
        text: "With men this is impossible; but with God all things are possible.",
        context: "When reconciliation looks impossible from where you stand, that is precisely God's specialty.",
      },
    ],
    reflection:
      "A marriage in crisis is one of the most painful places to stand, and prayer is not a way to bypass the hard work it will take — it's where the strength for that work comes from. God can do what no counseling or effort alone can: change a heart. But he usually works through people, too, so if you haven't yet, reaching out to a wise pastor or a marriage counselor is a faithful and brave step, not a failure.\n\nYou cannot control your spouse or guarantee the outcome. What you can do is bring your own heart honestly before God — your part in the breakdown, your hurt, your hope — and let him begin his work there. Sometimes the first marriage God saves is the one happening inside the person who finally kneels down to pray.",
    prayer:
      "Father, my marriage is breaking, and I am afraid we've gone too far to come back. You see every wound, every hard word, and the distance between us that I don't know how to cross. I'm asking for the impossible: soften both our hearts, where they've turned to stone, and restore what the years have eaten away. Where I have been wrong, show me and change me first. Give us both the humility to seek help and the courage to try again, and let your love do what ours alone cannot. Nothing is impossible for you — so I bring you my marriage. Amen.",
    actionStep:
      "Before you make any irreversible decision, pray Ezekiel 36:26 over both of you — \"give us hearts of flesh\" — and take one step toward help, not away: book a session with a pastor or marriage counselor, or send one honest, non-accusing message to your spouse.",
    prayerCta: {
      text: "Fighting for a specific marriage on the brink? Tell Faith Companion what's happening and get a personal prayer written for your situation.",
      buttonLabel: "Write a prayer for my marriage",
    },
    related: [
      { slug: "prayer-for-a-struggling-marriage", label: "A Prayer for a Struggling Marriage" },
      { slug: "faith", label: "Bible Verses About Faith" },
      { slug: "hope", label: "Bible Verses for Hope" },
    ],
  },

  "philippians-4-6": {
    topic: "philippians-4-6",
    label: "Peace",
    title: "Philippians 4:6: Do Not Be Anxious",
    description:
      "Philippians 4:6-7 (WEB) in full, with a plain explanation of what it means and a written prayer for peace. Trade anxiety for the peace that guards your heart.",
    intro:
      "When worry has a grip on you — the racing thoughts, the what-ifs, the knot in your chest — Philippians 4:6-7 is the passage believers return to again and again. It doesn't just tell you to stop worrying; it tells you what to do instead, and what God promises in return. Here is the passage, what it actually means, and a prayer for trading anxiety for peace.",
    verses: [],
    passage: {
      ref: "Philippians 4:6–7 (WEB)",
      text: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.",
    },
    meaning:
      "The first thing to notice is that this is a command with a method attached. \"In nothing be anxious\" could feel like an impossible order — you can't simply switch off worry — but Paul immediately tells you what to do with the anxiety: turn it into prayer. Every worry becomes a specific request, brought to God \"with thanksgiving,\" which keeps you mindful of what he's already done even while you ask for more.\n\nAnd notice what is promised — and what isn't. Paul doesn't promise that the thing you're anxious about will resolve the way you want. He promises something better and stranger: \"the peace of God, which surpasses all understanding.\" This is peace that doesn't make sense given your circumstances, a peace that \"guards\" your heart and mind like a soldier at a gate. Remember, too, that Paul wrote this from a prison cell — he wasn't theorizing about peace from a comfortable life, but practicing it in chains.",
    reflection:
      "The hard, hopeful truth of this passage is that the antidote to anxiety isn't getting your circumstances under control — it's handing them, one by one, to God. Anxiety keeps the problem circling in your own head; prayer moves it into God's hands. You may not feel the peace the instant you pray, and that's okay; the promise is that as you keep bringing each worry to God, his peace stands guard over you, holding the line your worry keeps trying to cross. Today, the invitation is simple: don't carry it — name it, and hand it over.",
    prayer:
      "Father, I'm carrying anxiety I can't seem to put down, and my mind keeps circling the same worries. Your Word tells me not to be anxious, but to bring everything to you — so here I am, handing you the exact thing weighing on me. Thank you that you already know it, and that you invite me to come with thanksgiving instead of only fear. Guard my heart and my mind with the peace that doesn't depend on my circumstances changing. Help me to leave this with you, and to keep coming back every time the worry returns. Amen.",
    actionStep:
      "Take the one worry that's loudest right now and turn it into a specific prayer — out loud or written down — beginning with one thing you're thankful for. Each time it comes circling back today, hand it to God again instead of rehearsing it.",
    prayerCta: {
      text: "Anxious about something specific right now? Tell Faith Companion what's weighing on you and get a calming, personal prayer written for it.",
      buttonLabel: "Write a prayer for peace",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "peace", label: "A Prayer for Peace" },
      { slug: "isaiah-41-10", label: "Isaiah 41:10: Fear Not" },
    ],
  },

  "psalm-121": {
    topic: "psalm-121",
    label: "God's Help",
    title: "Psalm 121: God Watches Over You",
    description:
      "Psalm 121 (KJV) in full, with a plain explanation of what it means and a written prayer for protection and help. God your keeper, who never slumbers or sleeps.",
    intro:
      "Psalm 121 is a traveler's psalm — words pilgrims sang as they climbed toward Jerusalem, eyes on the unknown road ahead. It's the chapter to reach for when you feel small against what's in front of you, and you need to remember who is watching over you. Here is the full psalm, what it means, and a prayer for God's protection and help.",
    verses: [],
    passage: {
      ref: "Psalm 121 (KJV)",
      text: "1 I will lift up mine eyes unto the hills, from whence cometh my help.\n2 My help cometh from the LORD, which made heaven and earth.\n3 He will not suffer thy foot to be moved: he that keepeth thee will not slumber.\n4 Behold, he that keepeth Israel shall neither slumber nor sleep.\n5 The LORD is thy keeper: the LORD is thy shade upon thy right hand.\n6 The sun shall not smite thee by day, nor the moon by night.\n7 The LORD shall preserve thee from all evil: he shall preserve thy soul.\n8 The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",
    },
    meaning:
      "The psalm opens with a question: the traveler lifts his eyes \"unto the hills\" — which in the ancient world were both where help might come from and where danger (bandits, pagan shrines) lurked. He answers his own uncertainty in verse 2: \"My help cometh from the LORD, which made heaven and earth.\" Not from the hills, not from himself — from the God who made it all.\n\nFrom there the psalm repeats one word again and again: keep. God is the one who \"keepeth\" you, and he \"shall neither slumber nor sleep\" — unlike the pagan gods who were thought to doze, the God of Israel never takes his eyes off you. The promises pile up: he keeps your foot from slipping, shades you from the sun, preserves you from evil, watches your \"going out and coming in.\" This isn't a promise that you'll never face hardship — it's a promise that through all of it, you are never unwatched and never alone. The God who keeps the whole universe is personally keeping you.",
    reflection:
      "There's deep comfort in that small, repeated word: kept. So much of life is outside your control — the road ahead, the people you love, the things you can't see coming. Psalm 121 doesn't tell you to control them; it tells you that the One watching over you never sleeps, never looks away, never clocks out. You can lie down tonight and actually rest, because the One keeping watch doesn't need to. Whatever your going out and coming in holds tomorrow, you go into it kept.",
    prayer:
      "LORD, you are my keeper, and today I need to remember it. You made heaven and earth, and yet you don't lose sight of me for a single moment. Watch over my going out and my coming in, and over the people I love when I can't be with them. Keep my foot from slipping when the road is uncertain, and guard my heart from the fears that creep in at night. Help me to lift my eyes from my worries to you, the One who never slumbers nor sleeps. I rest in your keeping. Amen.",
    actionStep:
      "Tonight, as you lie down, pray verse 4 over yourself and your family — \"he that keepeth me will neither slumber nor sleep\" — and consciously hand him the things you can't control while you sleep. Let him keep watch so you don't have to.",
    prayerCta: {
      text: "Facing an uncertain road or worried about someone you love? Tell Faith Companion what you're facing and get a personal prayer for protection and help written for it.",
      buttonLabel: "Write a prayer for protection",
    },
    related: [
      { slug: "prayer-for-protection-over-my-family", label: "A Prayer for Family Protection" },
      { slug: "psalm-91", label: "Psalm 91: God's Protection" },
      { slug: "faith", label: "Bible Verses About Faith" },
    ],
  },

  "psalm-27": {
    topic: "psalm-27",
    label: "When You're Afraid",
    title: "Psalm 27: The Lord Is My Light",
    description:
      "Psalm 27 (KJV) in full, with a plain explanation of what it means and a written prayer for confidence when afraid. The Lord is my light — whom shall I fear?",
    intro:
      "Psalm 27 is a defiant, hopeful song for frightening times — written by David when enemies pressed in and the outcome was anything but certain. It moves honestly between bold confidence and raw pleading, which is exactly why it rings true when you're afraid. Here is the full psalm, what it means, and a prayer for confidence when fear closes in.",
    verses: [],
    passage: {
      ref: "Psalm 27 (KJV)",
      text: "1 The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?\n2 When the wicked, even mine enemies and my foes, came upon me to eat up my flesh, they stumbled and fell.\n3 Though an host should encamp against me, my heart shall not fear: though war should rise against me, in this will I be confident.\n4 One thing have I desired of the LORD, that will I seek after; that I may dwell in the house of the LORD all the days of my life, to behold the beauty of the LORD, and to enquire in his temple.\n5 For in the time of trouble he shall hide me in his pavilion: in the secret of his tabernacle shall he hide me; he shall set me up upon a rock.\n6 And now shall mine head be lifted up above mine enemies round about me: therefore will I offer in his tabernacle sacrifices of joy; I will sing, yea, I will sing praises unto the LORD.\n7 Hear, O LORD, when I cry with my voice: have mercy also upon me, and answer me.\n8 When thou saidst, Seek ye my face; my heart said unto thee, Thy face, LORD, will I seek.\n9 Hide not thy face far from me; put not thy servant away in anger: thou hast been my help; leave me not, neither forsake me, O God of my salvation.\n10 When my father and my mother forsake me, then the LORD will take me up.\n11 Teach me thy way, O LORD, and lead me in a plain path, because of mine enemies.\n12 Deliver me not over unto the will of mine enemies: for false witnesses are risen up against me, and such as breathe out cruelty.\n13 I had fainted, unless I had believed to see the goodness of the LORD in the land of the living.\n14 Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD.",
    },
    meaning:
      "The psalm begins with a question that answers itself: \"The LORD is my light and my salvation; whom shall I fear?\" Fear shrinks when you measure the threat against the size of the One on your side. David isn't pretending there's no danger — he names whole armies encamped against him — but his confidence isn't in his circumstances; it's in God's presence.\n\nWhat's striking is how the psalm refuses to stay on the mountaintop. By the middle it turns to pleading: \"Hide not thy face from me... leave me not.\" This is honest faith — confidence and desperation in the same breath. And it ends not with the problem solved, but with a resolve: \"Wait on the LORD: be of good courage, and he shall strengthen thine heart.\" The courage Psalm 27 offers isn't the absence of fear; it's the decision to keep your eyes on God and wait, trusting that you will yet \"see the goodness of the LORD in the land of the living\" (v. 13).",
    reflection:
      "Psalm 27 gives you permission to be both brave and afraid at once. You don't have to manufacture fearlessness; you only have to keep turning your eyes back to your light and your salvation. Notice David's one deep desire (v. 4) — not the removal of his enemies, but nearness to God. Often the thing that steadies us in fear isn't getting answers, but getting close to the One who holds them. When fear says wait in dread, this psalm says wait in courage: he will strengthen your heart.",
    prayer:
      "LORD, you are my light and my salvation — when fear closes in, help me to remember that and to ask the only honest question left: whom shall I fear? You see exactly what I'm afraid of, the thing that feels too big for me. Be my stronghold; hide me in your shelter when I feel exposed, and do not hide your face from me. Strengthen my heart while I wait, and help me to believe that I will yet see your goodness in the land of the living. I will wait on you, and take courage. Amen.",
    actionStep:
      "When the fear spikes today, pray Psalm 27:1 back to God as a question — \"You are my light and my salvation; whom shall I fear?\" — and then sit for two minutes with verse 14: \"Wait on the LORD... he shall strengthen thine heart.\"",
    prayerCta: {
      text: "Facing something that frightens you right now? Tell Faith Companion what you're up against and get a personal prayer for courage written for it.",
      buttonLabel: "Write a prayer for courage",
    },
    related: [
      { slug: "anxiety", label: "Bible Verses for Anxiety" },
      { slug: "isaiah-41-10", label: "Isaiah 41:10: Fear Not" },
      { slug: "strength", label: "Bible Verses About Strength" },
    ],
  },

  "psalm-139": {
    topic: "psalm-139",
    label: "When You Feel Unseen",
    title: "Psalm 139: You Have Searched Me",
    description:
      "Psalm 139 (KJV) in full, with a plain explanation of what it means and a written prayer for when you feel unseen or unknown. Fully known, and fully loved by God.",
    intro:
      "Psalm 139 is for the moments you feel invisible — overlooked, misunderstood, unknown even to the people closest to you. It answers that ache with one of the most staggering claims in all of Scripture: that the God of the universe knows you completely, down to the words on your tongue before you speak them. Here is the passage, what it means, and a prayer for when you feel unseen.",
    verses: [],
    passage: {
      ref: "Psalm 139:1–18, 23–24 (KJV)",
      text: "1 O LORD, thou hast searched me, and known me.\n2 Thou knowest my downsitting and mine uprising, thou understandest my thought afar off.\n3 Thou compassest my path and my lying down, and art acquainted with all my ways.\n4 For there is not a word in my tongue, but, lo, O LORD, thou knowest it altogether.\n5 Thou hast beset me behind and before, and laid thine hand upon me.\n6 Such knowledge is too wonderful for me; it is high, I cannot attain unto it.\n7 Whither shall I go from thy spirit? or whither shall I flee from thy presence?\n8 If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.\n9 If I take the wings of the morning, and dwell in the uttermost parts of the sea;\n10 Even there shall thy hand lead me, and thy right hand shall hold me.\n11 If I say, Surely the darkness shall cover me; even the night shall be light about me.\n12 Yea, the darkness hideth not from thee; but the night shineth as the day: the darkness and the light are both alike to thee.\n13 For thou hast possessed my reins: thou hast covered me in my mother's womb.\n14 I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.\n15 My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth.\n16 Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them.\n17 How precious also are thy thoughts unto me, O God! how great is the sum of them!\n18 If I should count them, they are more in number than the sand: when I awake, I am still with thee.\n23 Search me, O God, and know my heart: try me, and know my thoughts:\n24 And see if there be any wicked way in me, and lead me in the way everlasting.",
    },
    meaning:
      "David explores three overwhelming truths about God, and lets each one land. First, God knows him completely (vv. 1-6): every thought, every word, every movement — \"such knowledge is too wonderful for me.\" Second, God is everywhere (vv. 7-12): there is no place — not the heights, not the depths, not the darkness — where God's presence and hand don't reach him. Third, God made him on purpose (vv. 13-16): \"I am fearfully and wonderfully made,\" formed deliberately, with all his days written in God's book before one of them came to be.\n\nPut together, these aren't abstract doctrines — they are the cure for feeling unseen. To be fully known and still held, fully visible and still loved, is what every lonely heart longs for. (The psalm also has a raw middle section, not quoted here, where David pours out his anger at evil — proof that being fully known by God includes being honest with him about everything.) It closes where real intimacy always leads: \"Search me, O God, and know my heart\" — an invitation, from someone who has realized that being completely known by God is the safest thing in the world.",
    reflection:
      "There is a particular loneliness in feeling unknown — as if you could disappear and no one would really notice the real you. Psalm 139 speaks directly into it: before you were born, God knew you; right now, wherever you are, he sees you; and his thoughts toward you are \"more in number than the sand.\" You are not overlooked. You are not a stranger to the One who matters most. Today, let that reframe the ache — you are fully known, and at the very same time, fully wanted.",
    prayer:
      "Father, I feel unseen today, as if the real me goes unnoticed. And yet your Word says you have searched me and known me — every thought, every word, every hidden place. Thank you that there is nowhere I can go from your presence, and that even in the dark you are there, holding me with your right hand. Thank you that I am fearfully and wonderfully made — no accident, fully known and still fully loved. Quiet the lie that I am forgotten, and let me rest in being seen by you. Search me, know me, and lead me in the way everlasting. Amen.",
    actionStep:
      "Read Psalm 139:1-6 slowly and make it personal — \"You know my sitting down and my rising up; you understand my thoughts.\" Then name one part of you that feels unseen, and tell God that he already sees it and loves you still.",
    prayerCta: {
      text: "Feeling unseen or unknown in a specific season? Tell Faith Companion what's on your heart and get a gentle, personal prayer written for it.",
      buttonLabel: "Write a prayer for me",
    },
    related: [
      { slug: "bible-verses-for-loneliness", label: "Bible Verses for Loneliness" },
      { slug: "prayer-for-when-you-feel-far-from-god", label: "A Prayer When You Feel Far from God" },
      { slug: "hope", label: "Bible Verses for Hope" },
    ],
  },

  "bible-verses-for-love": {
    topic: "bible-verses-for-love",
    label: "Love",
    title: "Bible Verses for Love",
    description:
      "Scripture on God's love for you and how to love others — key Bible verses about love, a reflection, and a prayer. Discover the love that defines the Christian faith.",
    intro:
      "The Bible says more about love than almost any other subject. Whether you are trying to grasp how deeply God loves you, learning to love others well, or seeking encouragement in a relationship, these passages anchor you in the love that runs from Genesis to Revelation. Below are key Bible verses about love, a short reflection, and a prayer you can pray right now.",
    verses: [
      {
        ref: "1 Corinthians 13:4–7 (WEB)",
        text: "Love is patient and is kind. Love doesn't envy. Love doesn't brag, is not proud, doesn't behave itself inappropriately, doesn't seek its own way, is not provoked, takes no account of evil; doesn't rejoice in unrighteousness, but rejoices with the truth; bears all things, believes all things, hopes all things, endures all things.",
        context: "The Bible's fullest definition of love — not a feeling but a steady, self-giving choice. Read it slowly; each line is a description of how God Himself loves you.",
      },
      {
        ref: "John 3:16 (KJV)",
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        context: "Love defined by sacrifice. God's love for you was never theoretical — it cost Him everything.",
      },
      {
        ref: "Romans 8:38–39 (KJV)",
        text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.",
        context: "Paul names every imaginable threat to God's love and declares them all powerless. Nothing can separate you from it.",
      },
      {
        ref: "1 John 4:7–8 (KJV)",
        text: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God. He that loveth not knoweth not God; for God is love.",
        context: "God does not merely show love — He is love. Our capacity to love others is itself a reflection of His nature in us.",
      },
      {
        ref: "Romans 5:8 (KJV)",
        text: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
        context: "God's love was never conditional on us getting our act together first. He loved us at our worst — which means His love can be trusted completely.",
      },
      {
        ref: "Zephaniah 3:17 (KJV)",
        text: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.",
        context: "One of the tenderest pictures of God's love in all of Scripture — He does not merely tolerate you, He delights in you and sings over you.",
      },
    ],
    reflection:
      "We tend to treat love as something we feel and then act on. The Bible reverses the order. \"We love because he first loved us\" (1 John 4:19) — love begins with God, flows to us, and then through us to others. You are not the source; you are a channel.\n\nThat changes how you love the difficult people in your life. You don't have to manufacture warm feelings before you act. You love out of the overflow of being loved — patiently, kindly, without keeping a record of wrongs — because that is exactly how you have been treated by God. The most freeing truth in Scripture is that His love for you does not rise and fall with your performance. It held while you were still a sinner; it holds now.",
    prayer:
      "Father, thank You that You loved me first — before I ever turned toward You, while I was still far off. Thank You that nothing in all creation can separate me from Your love in Christ.\n\nWhere I have tried to earn love, or feared losing it, settle my heart in the truth that I am already fully and finally loved by You.\n\nAnd make me a person who loves the way You love — patient, kind, slow to anger, keeping no record of wrongs. Give me grace for the people who are hardest to love, because that is the love You have shown me. Let Your love flow through me today. In Jesus' name, Amen.",
    actionStep:
      "Think of one person who is hard for you to love right now. Read 1 Corinthians 13:4–7 slowly, replacing the word \"love\" with your own name — \"[Name] is patient, [Name] is kind…\" Notice where it convicts you, and ask God for the grace to love that person one concrete way today.",
    prayerCta: {
      text: "Need words for a specific relationship — gratitude, reconciliation, or simply asking God to help you love someone well? Tell Faith Companion what's on your heart and get a personal, Scripture-based prayer.",
      buttonLabel: "Write a prayer about love",
    },
    related: [
      { slug: "bible-verses-for-mothers", label: "Bible Verses for Mothers" },
      { slug: "forgiveness", label: "What the Bible Says About Forgiveness" },
      { slug: "gratitude", label: "A Prayer of Gratitude" },
      { slug: "hope", label: "Bible Verses for Hope" },
    ],
  },

  "bible-verses-for-mothers": {
    topic: "bible-verses-for-mothers",
    label: "Mothers",
    title: "Bible Verses for Mothers",
    description:
      "Encouraging Bible verses for mothers — strength, wisdom, and God's blessing for the journey of motherhood. With a reflection and a prayer for every season of being a mom.",
    intro:
      "Motherhood is one of the most profound callings there is, and Scripture honors it deeply. Whether you are a new mother finding your footing, a tired mom in the thick of it, a mother still carrying grown children in prayer, or someone honoring a mother who has passed, these Bible verses speak to the beauty, the weight, and the significance of a mother's love. Below are encouraging passages, a reflection, and a prayer.",
    verses: [
      {
        ref: "Proverbs 31:25–26 (KJV)",
        text: "Strength and honour are her clothing; and she shall rejoice in time to come. She openeth her mouth with wisdom; and in her tongue is the law of kindness.",
        context: "The Proverbs 31 mother is not defined by perfection but by character — strength, dignity, wisdom, and kindness. That is the goal, and none of it requires having it all together.",
      },
      {
        ref: "Isaiah 66:13 (KJV)",
        text: "As one whom his mother comforteth, so will I comfort you; and ye shall be comforted in Jerusalem.",
        context: "God reaches for the image of a mother's comfort to describe His own. A mother's tenderness reflects something true about the heart of God.",
      },
      {
        ref: "Psalm 127:3 (KJV)",
        text: "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.",
        context: "Children are not burdens but blessings — entrusted to mothers as gifts. Motherhood is a sacred stewardship, even on the exhausting days.",
      },
      {
        ref: "Philippians 4:13 (KJV)",
        text: "I can do all things through Christ which strengtheneth me.",
        context: "For the overwhelmed mother: strength is available. The impossible-feeling demands of motherhood are met with divine strength for those who lean on Christ.",
      },
      {
        ref: "Proverbs 22:6 (KJV)",
        text: "Train up a child in the way he should go: and when he is old, he will not depart from it.",
        context: "The investment of faithful mothering lasts a lifetime. The values and faith you plant in the early years carry further than you may ever see.",
      },
      {
        ref: "Lamentations 3:22–23 (KJV)",
        text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
        context: "For the mother who feels she failed today — His mercies are new tomorrow. Every morning is a fresh start with a God whose compassion never runs out.",
      },
    ],
    reflection:
      "No one tells you how much of motherhood happens unseen — the prayers whispered over a crib, the worry carried quietly, the thousand small acts of love no one applauds. It can feel invisible. Scripture says it is not.\n\nGod sees the faithful mother. He compares His own comfort to hers (Isaiah 66:13), calls her children a reward (Psalm 127:3), and promises that the faith passed down through a mother shapes generations — as it did through Timothy's mother Eunice and grandmother Lois (2 Timothy 1:5). On the days you feel you are failing, Lamentations 3 is for you: His mercies are new every morning. You do not have to be a perfect mother. You have to be a present one, leaning on the God who gives strength for all things.",
    prayer:
      "Father, thank You for the gift and the calling of being a mother. You know how much of this I carry quietly — the love, the worry, the tiredness, the prayers no one else hears.\n\nWhen I feel I am not enough, remind me that Your mercies are new every morning and Your strength is made perfect in my weakness. Clothe me with strength and dignity. Give me wisdom for the decisions, patience for the hard moments, and kindness on my tongue.\n\nWatch over my children wherever they are today. Plant a faith in them that will not depart when they are old. And on the days I feel invisible, remind me that You see me, You delight in me, and You are with me. In Jesus' name, Amen.",
    actionStep:
      "Pick the verse above that meets you where you are today, and write it somewhere you'll see it — a phone lock screen, the bathroom mirror, the fridge. The next time motherhood feels overwhelming or unseen, read it out loud and let it reframe the moment.",
    prayerCta: {
      text: "Carrying something specific as a mom — a worried season, a prodigal child, sheer exhaustion? Tell Faith Companion what's on your heart and get a gentle, personal prayer written for it.",
      buttonLabel: "Write a prayer for me",
    },
    related: [
      { slug: "bible-verses-for-love", label: "Bible Verses for Love" },
      { slug: "strength", label: "Bible Verses About Strength" },
      { slug: "prayer-for-protection-over-my-family", label: "A Prayer for Family Protection" },
      { slug: "prayer-for-a-prodigal-child", label: "A Prayer for a Prodigal Child" },
    ],
  },
};

export const TOPIC_SLUGS = Object.keys(TOPICS);

export function getTopic(slug: string): TopicData | undefined {
  return TOPICS[slug];
}

/**
 * Thematic grouping for the /topics hub page. Lists the non-passage topic pages
 * by theme. Scripture passage pages (those with a `passage` field) are grouped
 * automatically by the hub, and any topic NOT listed here still appears on the
 * hub under a "More Topics" fallback — so a new page can never be orphaned, it
 * just needs adding to the right group below.
 */
export const TOPIC_GROUPS: Array<{ title: string; slugs: string[] }> = [
  {
    title: "Anxiety, Fear & Peace",
    slugs: ["anxiety", "peace", "bible-verses-for-when-you-cant-sleep"],
  },
  {
    title: "Grief, Depression & Loneliness",
    slugs: ["bible-verses-for-grief", "bible-verses-for-depression", "bible-verses-for-loneliness"],
  },
  {
    title: "Health, Sickness & Hard Seasons",
    slugs: [
      "healing",
      "prayer-for-a-sick-parent",
      "prayer-before-surgery",
      "prayer-for-a-friend-who-is-hurting",
      "prayer-for-a-pregnant-friend-safe-delivery",
    ],
  },
  {
    title: "Marriage & Family",
    slugs: [
      "prayer-for-a-struggling-marriage",
      "prayer-to-save-my-marriage",
      "prayer-for-a-prodigal-child",
      "prayer-for-a-loved-one-struggling-with-addiction",
      "prayer-for-protection-over-my-family",
      "prayer-for-the-first-day-of-school",
      "bible-verses-for-mothers",
      "bible-verses-for-love",
    ],
  },
  {
    title: "Work, Money & Decisions",
    slugs: [
      "prayer-for-a-job-interview",
      "prayer-for-starting-a-new-job",
      "prayer-for-financial-provision",
      "what-does-the-bible-say-about-worry-and-money",
      "prayer-for-guidance-when-facing-a-big-decision",
    ],
  },
  {
    title: "Forgiveness, Patience & Anger",
    slugs: [
      "forgiveness",
      "prayer-for-patience-with-a-difficult-person",
      "bible-verses-for-anger-and-self-control",
    ],
  },
  {
    title: "Faith, Hope & Strength",
    slugs: ["faith", "hope", "strength", "gratitude", "prayer-for-when-you-feel-far-from-god"],
  },
];
