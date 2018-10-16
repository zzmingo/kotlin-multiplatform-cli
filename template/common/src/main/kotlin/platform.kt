package <%= bundleId %>

expect class Platform() {

  companion object {
    val current: Platform
  }

  val name: String

  fun println(obj: Any)
}

fun log(obj: Any?) {
  if (obj == null) {
    return
  }
  Platform.current.println(obj)
}