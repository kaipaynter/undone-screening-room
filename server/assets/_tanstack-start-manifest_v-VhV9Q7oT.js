//#region \0tanstack-start-manifest:v
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/home/runner/work/undone-screening-room/undone-screening-room/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth"
		],
		preloads: ["/assets/index-BXmXxQmg.js", "/assets/useRouter-DeDOna9C.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BXmXxQmg.js"
		} }]
	},
	"/": {
		filePath: "/home/runner/work/undone-screening-room/undone-screening-room/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DO-jHMeN.js",
			"/assets/card-DOgOMjFa.js",
			"/assets/mail-Bm_tdA6q.js",
			"/assets/badge-BhIyjA2X.js"
		]
	},
	"/_authenticated": {
		filePath: "/home/runner/work/undone-screening-room/undone-screening-room/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/library"],
		preloads: ["/assets/route-DYWZSnFG.js"]
	},
	"/auth": {
		filePath: "/home/runner/work/undone-screening-room/undone-screening-room/src/routes/auth.tsx",
		children: void 0,
		preloads: [
			"/assets/auth-DHehlgRb.js",
			"/assets/card-DOgOMjFa.js",
			"/assets/mail-Bm_tdA6q.js",
			"/assets/loader-circle-DqjIrEp6.js"
		]
	},
	"/_authenticated/library": {
		filePath: "/home/runner/work/undone-screening-room/undone-screening-room/src/routes/_authenticated/library.tsx",
		children: void 0,
		preloads: [
			"/assets/library-Cg0vRtzF.js",
			"/assets/card-DOgOMjFa.js",
			"/assets/badge-BhIyjA2X.js",
			"/assets/loader-circle-DqjIrEp6.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
