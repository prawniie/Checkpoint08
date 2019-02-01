using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("getalluniquespecies")]
        public IActionResult GetAllUniqueSpecies()
        {
            List<string> species = _repo.GetAllUniqueSpecies();
            return Ok(species);
        }

        [HttpGet("checkifobservationexists")]
        public IActionResult CheckIfObservationExists(string location, string species)
        {
            //bool observationExists = true;

            List<Observation> observations = _repo.GetAllObservations();

            List<Observation> observationsOfSpecies = observations.Where(o => o.Species == species).ToList();

            if (observationsOfSpecies == null || observationsOfSpecies.Count == 0)
            {
                return Ok(false);
            }
            else
            {
                foreach (var o in observationsOfSpecies)
                {
                    if (o.Location == location)
                    {
                        return Ok(true);
                    }
                }
            }

            return Ok();
        }

    }
}
