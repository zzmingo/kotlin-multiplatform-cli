package <%= bundleId %>

actual class Platform actual constructor() {

  actual companion object {
    actual val current: Platform = Platform()
  }

  actual val name: String = "Web"

  actual fun println(obj: Any) {
    console.log(obj)
  }

}