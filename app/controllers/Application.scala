package controllers

import play.api._
import play.api.mvc._
import scala.io.Source
import play.twirl.api.Html

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("blah blah blah"))
  }

  def paper = Action {
    val fname = "/home/kate/research/paper-header-annotator/public/papers/test2.svg.clean"
    val src = Source.fromFile(fname).getLines().mkString("\n")
    Ok(views.html.paper("an academic paper", Html.apply(src)))
  }

  def test = Action {
    Ok(views.html.test())
  }

}