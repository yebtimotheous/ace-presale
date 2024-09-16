(function () {
  "use strict";

  // Configuration
  const config = {
    debugMode: false,
    redirectUrl: "https://spg.cx/unauthorized",
    checkInterval: 500,
    maxFailedAttempts: 3,
    cooldownPeriod: 60000,
    fingerprintThreshold: 0.75,
    encryptionKey: "YourSecretKeyHere",
  };

  // Obfuscation utility
  const obfuscate = (code) => {
    // Step 1: Convert to hexadecimal
    const toHex = (str) => {
      let result = "";
      for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16).padStart(2, "0");
      }
      return result;
    };

    // Step 2: Custom encoding function
    const customEncode = (hex) => {
      const dictionary =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      let result = "";
      for (let i = 0; i < hex.length; i += 3) {
        const chunk = hex.slice(i, i + 3);
        const paddedChunk = chunk.padEnd(3, "0");
        const decimal = parseInt(paddedChunk, 16);
        result += dictionary[decimal >> 6] + dictionary[decimal & 63];
      }
      return result;
    };

    // Step 3: Add noise
    const addNoise = (encoded) => {
      let result = "";
      for (let i = 0; i < encoded.length; i++) {
        result +=
          encoded[i] + String.fromCharCode(Math.floor(Math.random() * 65535));
      }
      return result;
    };

    // Step 4: Encrypt using AES
    const encrypt = (text, key) => {
      const textBytes = aesjs.utils.utf8.toBytes(text);
      const keyBytes = aesjs.utils.utf8.toBytes(
        key.slice(0, 32).padEnd(32, "0")
      );
      const aesCtr = new aesjs.ModeOfOperation.ctr(
        keyBytes,
        new aesjs.Counter(5)
      );
      const encryptedBytes = aesCtr.encrypt(textBytes);
      return aesjs.utils.hex.fromBytes(encryptedBytes);
    };

    // Step 5: Generate decoding function
    const generateDecodingFunction = () => {
      return `
        function decode(str) {
          const removeNoise = s => s.split('').filter((_, i) => i % 2 === 0).join('');
          const customDecode = s => {
            const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            let result = '';
            for (let i = 0; i < s.length; i += 2) {
              const pair = s.slice(i, i + 2);
              const decimal = (dictionary.indexOf(pair[0]) << 6) | dictionary.indexOf(pair[1]);
              result += decimal.toString(16).padStart(3, '0');
            }
            return result;
          };
          const fromHex = h => {
            let result = '';
            for (let i = 0; i < h.length; i += 2) {
              result += String.fromCharCode(parseInt(h.slice(i, i + 2), 16));
            }
            return result;
          };
          const decrypt = (encryptedHex, key) => {
            const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
            const keyBytes = aesjs.utils.utf8.toBytes(key.slice(0, 32).padEnd(32, '0'));
            const aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(5));
            const decryptedBytes = aesCtr.decrypt(encryptedBytes);
            return aesjs.utils.utf8.fromBytes(decryptedBytes);
          };
          return decrypt(fromHex(customDecode(removeNoise(str))), 'YourSecretKeyHere');
        }
      `;
    };

    // Main obfuscation process
    const hexCode = toHex(code);
    const encodedCode = customEncode(hexCode);
    const noisyCode = addNoise(encodedCode);
    const encryptedCode = encrypt(noisyCode, "YourSecretKeyHere");
    const decodingFunction = generateDecodingFunction();

    return `
      ${decodingFunction}
      eval(decode('${encryptedCode}'));
    `;
  };

  // Utility functions
  const utils = {
    log: function (message) {
      if (config.debugMode) {
        console.log(`[ProtectionScript] ${message}`);
      }
    },
    generateRandomString: function (length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    },
    hashString: async function (str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    },
  };

  // Enhanced encryption utilities
  const crypto = {
    generateKey: async function () {
      return await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    },
    encryptData: async function (data, key) {
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encryptedContent = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encodedData
      );
      return {
        iv: Array.from(iv),
        content: Array.from(new Uint8Array(encryptedContent)),
      };
    },
    decryptData: async function (encryptedData, key) {
      const decoder = new TextDecoder();
      const decryptedContent = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(encryptedData.iv) },
        key,
        new Uint8Array(encryptedData.content)
      );
      return decoder.decode(decryptedContent);
    },
  };

  // Integrity check
  const integrityCheck = {
    initialChecksum: null,
    calculate: async function () {
      const criticalCode = core.toString() + protections.toString();
      return await utils.hashString(criticalCode);
    },
    verify: async function () {
      const currentChecksum = await this.calculate();
      return this.initialChecksum === currentChecksum;
    },
  };

  // Timing attack protection
  const addTimingNoise = (fn) => {
    return (...args) => {
      const noise = Math.random() * 100;
      setTimeout(() => fn(...args), noise);
    };
  };

  // Polymorphic code wrapper
  const polymorphicWrapper = (fn) => {
    const variations = [
      fn,
      (...args) => {
        console.log("Variation 1");
        return fn(...args);
      },
      (...args) => {
        console.log("Variation 2");
        return fn(...args);
      },
    ];
    return (...args) => {
      const index = Math.floor(Math.random() * variations.length);
      return variations[index](...args);
    };
  };

  // Heartbeat mechanism
  const heartbeat = {
    lastBeat: Date.now(),
    check: function () {
      const now = Date.now();
      if (now - this.lastBeat > 5000) {
        // 5 seconds threshold
        core.handleUnauthorizedAccess("Heartbeat interrupted");
      }
      this.lastBeat = now;
    },
  };

  // Protection mechanisms
  const protections = {
    fingerprint: {
      initialFingerprint: null,
      generate: async function () {
        const components = [
          navigator.userAgent,
          navigator.language,
          screen.colorDepth,
          screen.pixelDepth,
          new Date().getTimezoneOffset(),
          !!window.sessionStorage,
          !!window.localStorage,
          !!window.indexedDB,
          typeof window.openDatabase,
          navigator.hardwareConcurrency,
          navigator.deviceMemory,
          navigator.platform,
          navigator.doNotTrack,
          await this.getCanvasFingerprint(),
          await this.getWebGLFingerprint(),
          utils.generateRandomString(32),
        ];
        return await utils.hashString(components.join("|||"));
      },
      getCanvasFingerprint: async function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("Hello, world!", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("Hello, world!", 4, 17);
        return await utils.hashString(canvas.toDataURL());
      },
      getWebGLFingerprint: async function () {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");
        if (!gl) return null;
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          return await utils.hashString(
            gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          );
        }
        return null;
      },
      compare: function (fp1, fp2) {
        let similarity = 0;
        for (let i = 0; i < fp1.length; i++) {
          if (fp1[i] === fp2[i]) similarity++;
        }
        return similarity / fp1.length;
      },
      check: async function () {
        const currentFingerprint = await this.generate();
        if (
          this.initialFingerprint &&
          this.compare(this.initialFingerprint, currentFingerprint) <
            config.fingerprintThreshold
        ) {
          return "Browser fingerprint changed";
        }
        return null;
      },
    },
    devTools: {
      check: function () {
        const threshold = 160;
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;
        return widthThreshold || heightThreshold ? "DevTools open" : null;
      },
    },
    debugger: {
      check: function () {
        let startTime = performance.now();
        debugger;
        let endTime = performance.now();
        return endTime - startTime > 100 ? "Debugger attached" : null;
      },
    },
    tampering: {
      originalFunctions: {
        setTimeout: window.setTimeout,
        setInterval: window.setInterval,
        requestAnimationFrame: window.requestAnimationFrame,
        Date: window.Date,
        performance: window.performance,
      },
      check: function () {
        return Object.entries(this.originalFunctions).some(
          ([key, value]) => window[key] !== value
        )
          ? "Script tampering detected"
          : null;
      },
    },
    memoryUsage: {
      check: function () {
        if (performance.memory) {
          const memoryUsage =
            performance.memory.usedJSHeapSize /
            performance.memory.jsHeapSizeLimit;
          return memoryUsage > 0.9 ? "Suspicious memory usage" : null;
        }
        return null;
      },
    },
    automationTools: {
      props: [
        "__webdriver_evaluate",
        "__selenium_evaluate",
        "__webdriver_script_function",
        "__webdriver_script_func",
        "__webdriver_script_fn",
        "__fxdriver_evaluate",
        "__driver_unwrapped",
        "__webdriver_unwrapped",
        "__driver_evaluate",
        "__selenium_unwrapped",
        "__fxdriver_unwrapped",
        "_Selenium_IDE_Recorder",
        "_selenium",
        "calledSelenium",
        "$cdc_asdjflasutopfhvcZLmcfl_",
        "$chrome_asyncScriptInfo",
        "__$webdriverAsyncExecutor",
        "webdriver",
        "__webdriverFunc",
        "domAutomation",
        "domAutomationController",
      ],
      check: function () {
        for (const prop of this.props) {
          if (prop in window || prop in document) {
            return "Automation tool detected";
          }
        }
        return null;
      },
    },
    virtualMachine: {
      check: function () {
        return (
          this.checkHardware() ||
          this.checkTiming() ||
          this.checkArtifacts() ||
          this.checkWebGL()
        );
      },
      checkHardware: function () {
        // Check for VM-specific hardware characteristics
        const lowConcurrency = navigator.hardwareConcurrency <= 1;
        const lowMemory = navigator.deviceMemory <= 1;
        const suspiciousUserAgent = /virtual|vmware|virtualbox/i.test(
          navigator.userAgent
        );

        return lowConcurrency || lowMemory || suspiciousUserAgent;
      },
      checkTiming: function () {
        // Perform timing analysis to detect VMs
        const iterations = 1000000;
        const start = performance.now();
        for (let i = 0; i < iterations; i++) {
          Math.sqrt(Math.random());
        }
        const end = performance.now();
        const executionTime = end - start;

        // Adjust this threshold based on your testing
        const suspiciouslyFast = executionTime < 5;
        const suspiciouslyConsistent = this.checkConsistentTiming(
          iterations,
          5
        );

        return suspiciouslyFast || suspiciouslyConsistent;
      },
      checkConsistentTiming: function (iterations, runs) {
        const times = [];
        for (let i = 0; i < runs; i++) {
          const start = performance.now();
          for (let j = 0; j < iterations; j++) {
            Math.sqrt(Math.random());
          }
          const end = performance.now();
          times.push(end - start);
        }

        const mean = times.reduce((a, b) => a + b) / times.length;
        const variance =
          times.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / times.length;

        // If variance is very low, timing might be too consistent for a real machine
        return variance < 0.01;
      },
      checkArtifacts: function () {
        // Look for VM-specific artifacts
        const suspiciousProps = [
          "VMwareTraceTracker",
          "VBoxGuest",
          "VBoxObject",
          "VirtualBox",
          "__VMWARE_MOUSE_CURSOR_HIDDEN__",
        ];

        return suspiciousProps.some(
          (prop) => prop in window || prop in document
        );
      },
      checkWebGL: function () {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (!gl) return false;

        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          return /virtualbox|vmware|llvmpipe/i.test(renderer);
        }

        return false;
      },
    },
    integrityCheck: {
      check: async function () {
        return (await integrityCheck.verify())
          ? null
          : "Code integrity compromised";
      },
    },
  };

  // Core protection logic
  const core = {
    failedAttempts: 0,
    lastFailedAttempt: 0,

    initialize: async function () {
      try {
        utils.log("Initializing protection script...");
        await this.encryptSourceCode();
        protections.fingerprint.initialFingerprint =
          await protections.fingerprint.generate();
        integrityCheck.initialChecksum = await integrityCheck.calculate();
        this.applyProtections();
        this.startMonitoring();
        utils.log("Protection script initialized successfully.");
      } catch (error) {
        utils.log(`Initialization error: ${error.message}`);
      }
    },

    encryptSourceCode: async function () {
      const scripts = document.getElementsByTagName("script");
      const key = await crypto.generateKey();

      for (let script of scripts) {
        if (script.type !== "application/encrypted") {
          const originalContent = script.innerHTML;
          const encryptedData = await crypto.encryptData(originalContent, key);

          const newScript = document.createElement("script");
          newScript.type = "application/encrypted";
          newScript.setAttribute(
            "data-encrypted",
            JSON.stringify(encryptedData)
          );

          script.parentNode.replaceChild(newScript, script);
        }
      }

      // Add decryption logic
      const decryptionScript = document.createElement("script");
      decryptionScript.innerHTML = obfuscate(`
          (async () => {
            const key = await window.protectionScript.crypto.generateKey();
            const encryptedScripts = document.querySelectorAll('script[type="application/encrypted"]');
            
            for (let script of encryptedScripts) {
              const encryptedData = JSON.parse(script.getAttribute('data-encrypted'));
              const decryptedContent = await window.protectionScript.crypto.decryptData(encryptedData, key);
              
              const newScript = document.createElement('script');
              newScript.innerHTML = decryptedContent;
              script.parentNode.replaceChild(newScript, script);
            }
          })();
        `);
      document.head.appendChild(decryptionScript);
    },

    applyProtections: function () {
      document.addEventListener("contextmenu", (e) => e.preventDefault());
      document.onkeydown = this.handleKeyDown.bind(this);
      document.onselectstart = (e) => {
        e.preventDefault();
        return false;
      };
      document.oncopy = (e) => {
        e.preventDefault();
        return false;
      };
      document.querySelectorAll("img").forEach((img) => {
        img.draggable = false;
        img.addEventListener("dragstart", (e) => e.preventDefault());
      });

      if (window.console) {
        const noop = () => {};
        ["log", "debug", "info", "warn", "error", "table"].forEach((method) => {
          console[method] = noop;
        });
      }

      if (window.self !== window.top) {
        this.handleUnauthorizedAccess("Iframe embedding detected");
      }

      const observer = new MutationObserver(
        this.handleDOMManipulation.bind(this)
      );
      observer.observe(document.body, { childList: true, subtree: true });

      Object.freeze(window.chrome);
      Object.freeze(window.browser);
    },

    startMonitoring: function () {
      setInterval(this.runProtectionChecks.bind(this), config.checkInterval);
      setInterval(heartbeat.check.bind(heartbeat), 1000);
    },

    handleKeyDown: function (e) {
      const blockedKeys = [
        { key: 123, ctrl: false, shift: false, alt: false }, // F12
        { key: 73, ctrl: true, shift: true, alt: false }, // Ctrl+Shift+I
        { key: 67, ctrl: true, shift: true, alt: false }, // Ctrl+Shift+C
        { key: 85, ctrl: true, shift: false, alt: false }, // Ctrl+U
        { key: 80, ctrl: true, shift: false, alt: false }, // Ctrl+P (Print)
        { key: 83, ctrl: true, shift: false, alt: false }, // Ctrl+S (Save)
      ];

      for (const combo of blockedKeys) {
        if (
          e.keyCode === combo.key &&
          e.ctrlKey === combo.ctrl &&
          e.shiftKey === combo.shift &&
          e.altKey === combo.alt
        ) {
          e.preventDefault();
          this.handleUnauthorizedAccess("Blocked keyboard shortcut");
          return false;
        }
      }
    },

    handleDOMManipulation: function (mutations) {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          this.handleUnauthorizedAccess("Unauthorized DOM manipulation");
        }
      });
    },

    runProtectionChecks: polymorphicWrapper(async function () {
      const checks = [
        protections.fingerprint.check(),
        protections.devTools.check(),
        protections.debugger.check(),
        protections.tampering.check(),
        protections.memoryUsage.check(),
        protections.automationTools.check(),
        protections.virtualMachine.check(),
        protections.integrityCheck.check(),
      ];

      const results = await Promise.all(checks);
      const detectedThreats = results.filter((result) => result !== null);

      if (detectedThreats.length > 0) {
        this.handleUnauthorizedAccess(detectedThreats.join(", "));
      }
    }),

    handleUnauthorizedAccess: addTimingNoise(async function (reason) {
      const now = Date.now();
      if (now - this.lastFailedAttempt > config.cooldownPeriod) {
        this.failedAttempts = 0;
      }

      this.failedAttempts++;
      this.lastFailedAttempt = now;

      if (this.failedAttempts >= config.maxFailedAttempts) {
        const key = await crypto.generateKey();
        const encryptedReason = await crypto.encryptData(reason, key);
        utils.log(
          `Unauthorized access blocked: ${JSON.stringify(encryptedReason)}`
        );

        localStorage.clear();
        sessionStorage.clear();

        const encryptedUrl = await crypto.encryptData(config.redirectUrl, key);
        window.location.href = await crypto.decryptData(encryptedUrl, key);
      } else {
        utils.log(`Unauthorized access attempt detected: ${reason}`);
      }
    }),
  };

  // Expose necessary functions globally
  window.protectionScript = {
    crypto: crypto,
    utils: utils,
  };

  // Initialize the protection script
  core.initialize();
})();
