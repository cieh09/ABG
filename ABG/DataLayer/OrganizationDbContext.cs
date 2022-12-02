using System.Collections.Generic;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace ABG.DataLayer
{
    public class OrganizationDbContext : DbContext
    {
        public OrganizationDbContext(DbContextOptions<OrganizationDbContext> options)
        : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
        #region Entities
        public DbSet<Game> Games { get; set; } = null!;
        public DbSet<Genre> Genres { get; set; } = null!;
        public DbSet<PremiumSale> PremiumSales { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        #endregion
    }
}
