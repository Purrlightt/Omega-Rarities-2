const OMEGA_DATA = {
    "normalRunes": [
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Clear",
            "chance": "1/1",
            "stats": ["x320 Slime"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Cloud",
            "chance": "1/10",
            "stats": ["x192 Luck", "x160 Slime"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Butter",
            "chance": "1/50",
            "stats": ["x128 Luck", "x64 XP"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Crunchy",
            "chance": "1/600",
            "stats": ["x96 XP", "x64 Fire"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Icee",
            "chance": "1/10k",
            "stats": ["x128 XP", "x96 Slime"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Jelly Cube",
            "chance": "1/250k",
            "stats": ["x400 Luck", "x160 XP", "x48 Slime", "x112 Fire"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Glossy",
            "chance": "1/100m",
            "stats": ["x200 Luck", "x800 XP", "x600 Slime", "x200 Fire", "x+ 15 Rune Bulk"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Prismatic",
            "chance": "1/1Qd",
            "stats": ["x6 Rune Luck", "x20 Frost"]
        },
        {
            "world": "Slime",
            "worldNo": "Spawn",
            "rune": "Genesis",
            "chance": "1/750DDe",
            "stats": ["x4T Luck", "x4T XP", "x48k Plasma", "x2k Snowflake", "x20 Rune Speed", "x5 Rune Luck"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Ember",
            "chance": "1/1",
            "stats": ["x96 XP", "x160 Luck"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Smoke",
            "chance": "1/25",
            "stats": ["x320 Fire", "x160 XP", "x96 Luck"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Flame",
            "chance": "1/450",
            "stats": ["x256 Luck", "x160 XP", "x192 Slime"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Charcoal",
            "chance": "1/4k",
            "stats": ["x320 Luck", "x96 XP", "x128 Fire"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Inferno",
            "chance": "1/30k",
            "stats": ["x144 Luck", "x160 XP", "x128 Slime", "x240 Fire"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Lava Core",
            "chance": "1/175k",
            "stats": ["x320 Luck", "x160 XP", "x400 Slime", "x160 Fire"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Phoenix",
            "chance": "1/10m",
            "stats": ["x200 Luck", "x400 XP", "x400 Slime", "x600 Fire", "x+15 Rune Bulk"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Hades",
            "chance": "1/100b",
            "stats": ["x5k Luck", "x6k XP", "x3.2k Fire", "x+79 Rune Bulk"]
        },
        {
            "world": "Fire",
            "worldNo": "Spawn",
            "rune": "Hellstorm Core",
            "chance": "1/15TDe",
            "stats": ["x400T Luck", "x800T XP", "x8k Snowflake", "x4 Rune Luck", "x12 Rune Speed"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Coral",
            "chance": "1/1",
            "stats": ["x96 XP", "x160 Fire"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Mist",
            "chance": "1/50",
            "stats": ["x320 Luck", "x192 XP", "x400 Slime"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Stream",
            "chance": "1/1k",
            "stats": ["x160 Luck", "x160 XP", "x160 Water"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Tide",
            "chance": "1/25k",
            "stats": ["x96 Luck", "x96 XP", "x224 Water", "x640 Slime"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Tsunami",
            "chance": "1/500k",
            "stats": ["x400 Luck", "x800 XP", "x400 Slime"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Abyss",
            "chance": "1/10m",
            "stats": ["x480 Luck", "x1.2k XP", "x400 Fire"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Leviathan",
            "chance": "1/500m",
            "stats": ["x1k Luck", "x1.6k XP", "x800 Fire", "x16 Plasma", "x+39 Rune Bulk"]
        },
        {
            "world": "Water",
            "worldNo": "Spawn",
            "rune": "Poseidon",
            "chance": "1/10b",
            "stats": ["x2k Luck", "x120k XP", "x800 Fire", "x40 Plasma", "x8 Rune Bulk"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Spark",
            "chance": "1/1",
            "stats": ["x96 Plasma", "x96 XP"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Ionized",
            "chance": "1/100",
            "stats": ["x160 XP", "x128 Plasma", "x128 Water"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Voltage",
            "chance": "1/500",
            "stats": ["x224 Luck", "x128 XP", "x128 Plasma"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Charged",
            "chance": "1/10k",
            "stats": ["x320 Luck", "x640 XP", "x192 Plasma"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Supernova",
            "chance": "1/100k",
            "stats": ["x480 Luck", "x640 XP", "x160 Water", "x64 Plasma"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Nebula",
            "chance": "1/5m",
            "stats": ["x400 Luck", "x1.2k XP", "x500 Fire", "x20 Plasma"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Quasar",
            "chance": "1/500m",
            "stats": ["x4k Luck", "x400k XP", "x80 Plasma", "x+79 Rune Bulk", "x8 Rune Speed"]
        },
        {
            "world": "Plasma",
            "worldNo": "Spawn",
            "rune": "Celestial",
            "chance": "1/100b",
            "stats": ["x12k Luck", "x400k XP", "x400 Plasma", "x8 Rune Bulk"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Glacial",
            "chance": "1/2",
            "stats": ["x3.2k Luck", "x40 Snow"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Powder",
            "chance": "1/5k",
            "stats": ["x96 Snow", "x3.2k XP"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Rime",
            "chance": "1/40m",
            "stats": ["x8k Luck", "x8k XP", "x128 Snow", "x16 Rune Bulk"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Sleet",
            "chance": "1/5b",
            "stats": ["x16k Luck", "x12.8k XP", "x160 Snow", "x56 Rune Speed"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Permafrost",
            "chance": "1/250b",
            "stats": ["x16k Luck", "x19.2k XP", "x16 Frost"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Blizzardcore",
            "chance": "1/4t",
            "stats": ["x6.4k Luck", "x6.4k XP", "x12 Frost"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Aurora Borealis",
            "chance": "1/350t",
            "stats": ["x4k Luck", "x2.4k XP", "x20 Fire", "x60 Frost", "x24 Rune Speed"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Polar Vortex",
            "chance": "1/50Qd",
            "stats": ["x8k Luck", "x4k XP", "x24 Frost", "x8 Rune Bulk"]
        },
        {
            "world": "Snow",
            "worldNo": "Snow",
            "rune": "Absolute Zero",
            "chance": "1/2.5Sx",
            "stats": ["x20k Luck", "x10k XP", "x80 Snow", "x80 Frost", "x8 Rune Bulk", "x8 Rune Speed", "x8 Rune Luck"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Frostbite",
            "chance": "1/2",
            "stats": ["x36.8 Frost", "x16k Luck", "x16k Plasma"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Icicle",
            "chance": "1/500",
            "stats": ["x43.2 Frost", "x32k Luck", "x16k XP", "x40 Rune Speed"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Frozen",
            "chance": "1/25k",
            "stats": ["x38.4k Luck", "x96 Snow", "x48 Frost", "x19.2k XP", "x16 Rune Bulk"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Cryogenic",
            "chance": "1/1.5b",
            "stats": ["x12.8k Luck", "x12.8k XP", "x160 Frost", "x320 Snow", "x8k Plasma", "x48 Rune Speed"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Subzero",
            "chance": "1/2.5t",
            "stats": ["x16k Luck", "x19.2k XP", "x320 Frost", "x64 Rune Bulk"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Frostcore",
            "chance": "1/100t",
            "stats": ["x6.4k Luck", "x6.4k XP", "x160 Frost", "x160 Snow"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Crystalline",
            "chance": "1/15sx",
            "stats": ["x4k Luck", "x2.4k XP", "x20 Fire", "x800 Plasma", "x20 Frost", "x8 Rune Speed"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Deep Freeze",
            "chance": "1/1Sp",
            "stats": ["x8k Luck", "x4k XP", "x600 Plasma", "x80 Frost", "x+7 Rune Bulk"]
        },
        {
            "world": "Frost",
            "worldNo": "Snow",
            "rune": "Eternal Ice",
            "chance": "1/50sp",
            "stats": ["x20k Luck", "x10k XP", "x80 Frost", "x8 Rune Bulk", "x8 Rune Speed"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Needle",
            "chance": "1/1",
            "stats": ["x64 Snowflake", "x16k Luck"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Column",
            "chance": "1/2.5k",
            "stats": ["x38.4 Snowflake", "x32k Luck", "x9.6k Plasma", "x160 Frost"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Plate",
            "chance": "1/25k",
            "stats": ["x38.4k Luck", "x224 Snow", "x44.8 Snowflake", "x19.2k XP", "x12.8k Plasma", "x8 Rune Bulk"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Stellar",
            "chance": "1/25b",
            "stats": ["x12.8k Luck", "x12.8k XP", "x8.64k Plasma", "x64 Snowflake", "x64 Frost"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Sectored",
            "chance": "1/2.5Qd",
            "stats": ["x16k Luck", "x19.2k XP", "x73.6 Snowflake", "x36.8 Rune Bulk"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Fernlike",
            "chance": "1/100Qn",
            "stats": ["x6.4k Luck", "x6.4k XP", "x48 Snowflake", "x48 Snow"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Radiating",
            "chance": "1/30Oc",
            "stats": ["x4k Luck", "x2.4k XP", "x800 Plasma", "x9.4 Snowflake", "x4.6 Rune Bulk"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Capped",
            "chance": "1/20No",
            "stats": ["x8k Luck", "x4k XP", "x80 Snowflake", "x12 Rune Bulk", "x8 Rune Luck"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Crystal",
            "chance": "1/2.1De",
            "stats": ["x200k Luck", "x200k XP", "x800 Plasma", "x40 Snowflake", "x8 Rune Bulk", "x12 Rune Speed"]
        },
        {
            "world": "Snowflakes",
            "worldNo": "Snow",
            "rune": "Cosmic Ice",
            "chance": "1/25DDe",
            "stats": ["x400B Luck", "x400B XP", "x200 Snowflake", "x8 Rune Bulk", "x16 Rune Speed", "x10 Rune Luck"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Core",
            "chance": "1/1",
            "stats": ["x64 Stardust", "x32 Rune Speed"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Shard",
            "chance": "1/50m",
            "stats": ["x96 Stardust", "x16k Luck"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Relic",
            "chance": "1/25t",
            "stats": ["x144 Stardust", "x256k Luck", "x160 Fire"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Fragment",
            "chance": "1/15Qn",
            "stats": ["x192 Stardust", "x3.2M Luck", "x80 Frost"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Sigil",
            "chance": "1/250Sx",
            "stats": ["x96 Stardust", "x14.4M Luck", "x64 Snowflake"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Ember",
            "chance": "1/250Sp",
            "stats": ["x96 Stardust", "x320M Luck", "x48 Snowflake"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Nexus",
            "chance": "1/150No",
            "stats": ["x30 Stardust", "x20B Luck", "x8 Plasma"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Essence",
            "chance": "1/5UDe",
            "stats": ["x32 Stardust", "x20B Luck", "x8 Comets"]
        },
        {
            "world": "Stardust",
            "worldNo": "Galactic",
            "rune": "Stardust Remnant",
            "chance": "1/10DDe",
            "stats": ["x4B Luck", "x400Qd XP", "x20 Stardust", "x20 Comets"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Cosmic Frost",
            "chance": "1/1",
            "stats": ["x96 Comets"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Stellar Ice",
            "chance": "1/50m",
            "stats": ["x192 Comets", "x3.2Sx Luck"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Orbital Debris",
            "chance": "1/150t",
            "stats": ["x160 Comets", "x3.2SP Luck", "x80 Stardust"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Drift Fragment",
            "chance": "1/1De",
            "stats": ["x192 Comets", "x320Sp Luck"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Velocity Mark",
            "chance": "1/100UDe",
            "stats": ["x112 Comets", "x1.6Oc Luck", "x112 Meteors"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Atmospheric Burn",
            "chance": "1/100TDe",
            "stats": ["x128 Comets", "x160Oc Luck"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Impact Horizon",
            "chance": "1/100Vt",
            "stats": ["x40 Meteors", "x40 Comets", "x40 Stardust"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Extinction Core",
            "chance": "1/1TVt",
            "stats": ["x40 Comets", "x5k Luck", "x40 Meteors", "x200 Stardust"]
        },
        {
            "world": "Comets",
            "worldNo": "Galactic",
            "rune": "Astral Flux",
            "chance": "1/250SxVt",
            "stats": ["x? Luck", "x12 Rune Bulk", "x12 Rune Speed", "x12 Rune Luck"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Iron Fragment",
            "chance": "1/10",
            "stats": ["x96 Luck", "x96 Meteors"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Molten Stone",
            "chance": "1/10b",
            "stats": ["x160 Luck", "x96 Meteors"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Crater Dust",
            "chance": "1/10Qn",
            "stats": ["x320Qn Luck", "x96 Meteors", "x8 Singularity"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Scorched Trail",
            "chance": "1/100Sx",
            "stats": ["x96 Meteors", "x32Sx Luck"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Blazing Core",
            "chance": "1/1No",
            "stats": ["x48 Meteors", "x144 Luck"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Fireball Spark",
            "chance": "1/1UDe",
            "stats": ["x48 Meteors", "x1.6Oc Luck"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Shockwave Echo",
            "chance": "1/100QnDe",
            "stats": ["x40Oc Luck", "x12 Meteors"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Cataclysm Shard",
            "chance": "1/1Vt",
            "stats": ["x5 Singularity", "x4No Luck"]
        },
        {
            "world": "Meteors",
            "worldNo": "Galactic",
            "rune": "Cosmic Ember",
            "chance": "1/250SxVt",
            "stats": ["x60 Meteors", "x60 Singularity", "x? Luck"]
        }
    ],
    "eventRunes": [
        {
            "event": "1M Event World 2",
            "rune": "1M Noob",
            "chance": "1/1",
            "stats": ["x80 Slime", "x40 Fire"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Rookie",
            "chance": "1/2.5k",
            "stats": ["x160 Fire", "x36.8 Rune Bulk", "x33.6 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Skilled",
            "chance": "1/200k",
            "stats": ["x3.2T Luck", "x96 Comets", "x38.4 Snow", "x38.4 Rune Bulk", "x33.28 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Expert",
            "chance": "1/20m",
            "stats": ["x160T Luck", "x20.8 Plasma", "x19.2 Frost", "x16.4 Rune Bulk", "x16.4 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Master",
            "chance": "1/15b",
            "stats": ["x5 Stardust", "x5 Meteors", "x5.2 Snowflake", "x4.2 Rune Bulk", "x4.2 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Elite",
            "chance": "1/1t",
            "stats": ["x4M Luck", "x4.8 Meteors", "x4.24 Rune Bulk", "x4.32 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Mythic",
            "chance": "1/50t",
            "stats": ["x400M Luck", "x4.4 Stardust", "x4.8 Comets", "x4.52 Rune Bulk", "x4.52 Rune Luck"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M God",
            "chance": "1/1Qd",
            "stats": ["x4Qd Luck", "x5 Comets", "x4.8 Stardust", "x4.6 Rune Bulk", "x4.6 Rune Luck", "x1.52 Passive"]
        },
        {
            "event": "1M Event World 2",
            "rune": "1M Absolute",
            "chance": "1/900Qd",
            "stats": ["x40Qn Luck", "x8 Singularity", "x8 Meteors", "x6.8 Rune Bulk", "x6.8 Rune Luck", "x2 Passive"]
        }
    ],
    "changelog": [
        {
            "version": "v1.1.2",
            "date": "2026-02-16",
            "changes": [
                "Fixed a Typo in a Rune."
            ]
        },
        {
            "version": "v1.1.1",
            "date": "2026-02-16",
            "changes": [
                "Fixed a Security Vulnerability.",
                "Fixed a Typo in a Rune."
            ]
        },
        {
            "version": "v1.1.0",
            "date": "2026-02-15",
            "changes": [
                "Added Changelog tab.",
                "Added Feedback system.",
                "Added Rune Cap toggle (Max / Reborn 5)."
            ]
        },
        {
            "version": "v1.0.0",
            "date": "2026-02-08",
            "changes": [
                "Initial release of Rune Hub.",
                "Added Rune Calculator.",
                "Added Event Runes."
            ]
        }
    ],
    "feedback": [
        {
            "user": "System",
            "text": "Welcome to the Feedback section! Example feedback will appear here.",
            "date": "2026-02-15"
        }
    ]
};




