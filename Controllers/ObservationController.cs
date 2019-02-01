using System;
using System.Collections.Generic;
using BirdWatcher.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace BirdWatcher.Web.Controllers
{
    [Route("observation")]
    public class ObservationController : Controller
    {
        private readonly Repository _repo;

        public ObservationController(Repository repo)
        {
            _repo = repo;
        }

        [HttpPost("recreate")]
        public IActionResult RecreateDatabase()
        {
            _repo.RecreateDatabase();
            return Ok();
        }

        [HttpPost]
        public IActionResult Add([FromBody]Observation observation)
        {
            _repo.Add(observation);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Observation> observations = new List<Observation>();

            observations = _repo.GetAllObservations();
            return Ok(observations);
        }

    }
}
