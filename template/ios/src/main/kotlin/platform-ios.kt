package <%= bundleId %>

actual class Platform actual constructor() {

  actual companion object {
    actual val current: Platform = Platform()
  }

  actual val platform: String = "iOS"

}