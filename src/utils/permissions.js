/**
 * Permission utilities for TNT Dashboard
 * التحقق من الصلاحيات
 */

const { PermissionFlagsBits } = require('discord.js');
const config = require('../dashboard-config.json');

/**
 * Check if user is bot owner
 * @param {string} userId - User ID to check
 */
function isOwner(userId) {
  return userId === config.ownerId;
}

/**
 * Check if user has admin permissions
 * @param {GuildMember} member - Guild member to check
 */
function isAdmin(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.Administrator);
}

/**
 * Check if user has manage guild permissions
 * @param {GuildMember} member - Guild member to check
 */
function canManageGuild(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.ManageGuild);
}

/**
 * Check if user has manage roles permissions
 * @param {GuildMember} member - Guild member to check
 */
function canManageRoles(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.ManageRoles);
}

/**
 * Check if user has manage channels permissions
 * @param {GuildMember} member - Guild member to check
 */
function canManageChannels(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.ManageChannels);
}

/**
 * Check if user has manage messages permissions
 * @param {GuildMember} member - Guild member to check
 */
function canManageMessages(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.ManageMessages);
}

/**
 * Check if user has ban permissions
 * @param {GuildMember} member - Guild member to check
 */
function canBan(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.BanMembers);
}

/**
 * Check if user has kick permissions
 * @param {GuildMember} member - Guild member to check
 */
function canKick(member) {
  if (!member) return false;
  return member.permissions.has(PermissionFlagsBits.KickMembers);
}

/**
 * Permission denied message
 */
function getPermissionDeniedMessage() {
  return '❌ ليس لديك صلاحية للوصول إلى هذا القسم.\n❌ You do not have permission to access this section.';
}

module.exports = {
  isOwner,
  isAdmin,
  canManageGuild,
  canManageRoles,
  canManageChannels,
  canManageMessages,
  canBan,
  canKick,
  getPermissionDeniedMessage
};
