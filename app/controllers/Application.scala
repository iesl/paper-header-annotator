package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("blah blah blah"))
  }

  def paper = Action {
    Ok(views.html.paper("an academic paper", "academic paper contents"))
  }

}