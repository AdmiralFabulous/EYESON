# Changelog

All notable changes to the EYESON project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup and architecture
- Open source TTS implementation (Kokoro-82M + Piper fallback)

## [1.0.0] - 2026-02-01

### Added - Phase 1: Foundation

#### Architecture & Infrastructure
- Created modular project structure (backend, frontend, ml-service, infrastructure)
- Set up FastAPI application with async support
- Implemented configuration management with Pydantic Settings
- Added CORS and GZip middleware
- Created comprehensive `.gitignore` for Python, Node.js, and infrastructure

#### Open Source Voice AI (Major Decision)
**Changed from proprietary ElevenLabs to fully open source stack:**

- **Primary TTS**: Kokoro-82M (Apache 2.0 license)
  - 82M parameters, ~100-300ms latency on CPU
  - Native ONNX Runtime support
  - Browser-ready via ONNX Runtime Web
  
- **Fallback TTS**: Piper TTS (MIT license)
  - Ultra-fast 50-200ms latency
  - 10-50M parameters
  - 30+ languages support

#### Backend API
- Implemented TTS Service with caching (memory + disk)
- Created Voice API endpoints:
  - `GET /api/v1/voice/health` - Service health check
  - `GET /api/v1/voice/voices` - List available voices
  - `POST /api/v1/voice/synthesize` - Text-to-speech synthesis
  - `POST /api/v1/voice/synthesize/stream` - Streaming audio
  - `GET /api/v1/voice/prompts/{language}` - Voice prompt library
  - `POST /api/v1/voice/prompts/{language}/{id}/speak` - Speak predefined prompts
- Implemented complete voice prompt library for 90-second scan experience
  - English (en), Spanish (es), French (fr) support
  - 15+ prompts covering all scan phases
- Added streaming audio support for real-time voice guidance

#### Configuration
- Created `Settings` class with environment variable support
- Added TTS-specific configuration:
  - `TTS_MODEL`: Model selection (Kokoro-82M)
  - `TTS_VOICE`: Voice ID selection
  - `TTS_SPEED`: Speaking speed control
  - `TTS_CACHE_ENABLED`: Enable audio caching
  - `TTS_CACHE_DIR`: Cache storage location
  - `TTS_FALLBACK_MODEL`: Piper model for edge cases

#### Documentation
- Created comprehensive README with:
  - Project overview and features
  - Architecture diagram
  - Quick start guide
  - Technology stack details
  - Configuration reference
- Created CHANGELOG for version tracking

### Technical Details

#### TTS Performance
| Metric | Target | Kokoro-82M | Piper |
|--------|--------|------------|-------|
| Latency | <500ms | ~200ms | ~50ms |
| Quality (MOS) | >4.0 | 4.3 | 4.0 |
| Model Size | - | 82M | 10-50M |
| License | Open | Apache 2.0 | MIT |

#### Voice Prompt Timing (90-second scan)
```
0s   - Welcome (8s)
8s   - Consent (7s)
15s  - Device Setup (10s)
25s  - Calibration (12s)
37s  - Positioning (8s)
45s  - Capture Start (5s)
50s  - 30-second Turn (progress updates)
80s  - Processing (15s)
95s  - Results (15s)
```

### Security
- Added environment-based configuration
- Implemented secret key management
- Added CORS origin restrictions
- Created secure file upload settings

### Development
- Set up Git repository
- Created modular code structure
- Added type hints throughout
- Implemented async/await patterns
- Added comprehensive logging

### Known Issues
- TTS models need to be downloaded separately (not included in repo due to size)
- ONNX Runtime Web support pending for browser-side TTS
- Voice prompt caching needs Redis integration for distributed setups

### Next Steps
- [ ] Implement session management API
- [ ] Create measurement extraction service
- [ ] Build browser camera capture component
- [ ] Add PostgreSQL models and migrations
- [ ] Implement WebSocket real-time communication

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-02-01 | Initial release with open source TTS |

## Legend

- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements
