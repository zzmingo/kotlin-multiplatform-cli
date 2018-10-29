package <%= bundleId %>

actual class Platform actual constructor() {

  actual companion object {
    actual val current: Platform = Platform()
  }

  actual val name: String = "Android"

  actual fun println(obj: Any) {
    println(obj)
  }

}