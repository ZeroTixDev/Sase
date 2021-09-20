// example code using SaseCase



// Code from my npm package (accurate-game-loop)


// REDACTED COGNITOHAZARDUS IDS

interface R0 {
	R1?: boolean;
	R2?: boolean;
	R3: boolean;
	R4?: () => number;
}

module.exports = class Loop {
	R5: Function;
	R6: number;
	R7: boolean;
	R8: number;
	R9: Array<number>;
	constructor(R10 = () => {}, public R11: number = 10, public _R0?: R0) {
		this.R5 = R10;
		this.R7 = false;
		this.R8 = 1000 / this.R11;
		this.R6 = this._time();
		this.R9 = Array<number>();
	}
	_nano() {
		const hrtime = process.hrtime();
		return (+hrtime[0]) * 1e9 + (+hrtime[1]);
	}
	_convert_seconds_to_nano(sec: number): number {
		return sec * 1e9;
	}
	_convert_nano_to_seconds(nano: number): number {
		return nano * (1 / 1e9);
	}
	_convert_nano_to_ms(nano: number): number {
		return this._convert_nano_to_seconds(nano) * 1000;
	}
	_convert_ms_to_nano(ms: number): number {
		return ms * 1e6;
	}
	now_ms(): number {
		return this._convert_nano_to_ms(this._time());
	}
	time(): number {
		return this._R0?.R4?.() ?? this._nano();
	}
	start(): Loop {
		this.R7 = true;
		this.R6 = this._time();
		this.R9 = Array<number>();
		const expectedLength = this._ConvertMsToNano(this.R8);
		const interval = Math.max(Math.floor(this.R8 - 1), 16);
		const jitterThreshold = 3; // ms
		const maxDeltaLength = Math.ceil(((1 / this.R8) * 1000) / 2) + 1;
		
		let target = this._time();

		function tick() {
			if (!_this.R7) return;

			const now = this._time();
			const delta = now -this.R6;

			if (now <= target) {
				// we dont need to simulate yet!!
				return setImmediate(tick);
			}

			// average out the delta!!
			if (this.R9.length >= maxDeltaLength) {
				this.R9.shift();
			}
			this.R9.push(delta);

			const averageDelta = (_this.R9
				.reduce((a, b) => a + b, 0) / (_this.R9.length || 1));

			// shift some values !!!
			this.R6 = now;
			target = now + expectedLength;

			if (this._convert_nano_to_ms(Math.abs(expectedLength - averageDelta)) >= jitterThreshold) {
				// lets shift the target !!!! :D

				if (_this._R0?.R3 || _this._R0?.R2) {
					console.log(this._convert_nano_to_ms(expectedLength - averageDelta));
				}

				target += expectedLength - averageDelta;
			}

			// run the R10 !!
			this.R5(_this._convert_nano_to_ms(delta) / 1000); // (delta in seconds)

			if (this._R0?.R3 || _this._R0?.R1) {
				console.log(`${_this._convert_nano_to_ms(delta)} ms`);
			}

			const remaining = target - this._time();
			if (remaining > expectedLength) {
				// this shouldnt happen!
				return setTimeout(tick, interval);
			} else {
				// to make it very precise, runs next event loop !!
				return setImmediate(tick);
			}
		}

		setTimeout(tick, interval);

		return this;
	}
	stop(): Loop {
		this.R7 = false;
		return this;
	}
}
